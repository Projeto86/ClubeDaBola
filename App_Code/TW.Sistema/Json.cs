using System;
using System.Data;
using System.Globalization;
using System.Web;
using System.Text;

namespace TW.Sistema
{

	public sealed class Json {

		private Json() {}
		
		//Retorna o tipo de dados da coluna baseado no nome do campo
		private static string TipoColuna(DataColumn coluna){
			string tipo = "text";
			if(coluna.ColumnName.Length >= 2){
				switch(coluna.ColumnName.Substring(0,2).ToLower()){
					case "fl": tipo = "int"; break;
					case "id": tipo = "int"; break;
					case "nu": tipo = "int"; break;
					case "vl": tipo = "real"; break;
					case "tx": tipo = "text"; break;
					case "mm": tipo = "text"; break;
					case "dt": tipo = "datetime"; break;
					case "hr": tipo = "datetime"; break;
				}
			}
			return(tipo);
		}
		
		//Converte para o dado da celula para um formato do javascript baseado no tipo da coluna
		private static string Converte(DataColumn coluna, object celula){
			return(Converte(coluna, celula, null));
		}
		
		//Converte para o dado da celula para um formato do javascript baseado no tipo da coluna ou no padrão definido no colunas a exibir:
		// Exemplo: dt_data|{0:dd/MM/yyyy}   ou  vl_reak|{0:C}  ou   nu_telefone|{0:(##) ####-####}
		private static string Converte(DataColumn coluna, object celula, string colunasAexibir){
			string retorno = "\"\"";
			if(celula != DBNull.Value){
				string tipoCustom = ConverteCustom(coluna, colunasAexibir);
				if(tipoCustom!=null){
					retorno = "\""+String.Format(tipoCustom, celula).Replace("\\","\\\\").Replace("\"","\\\"").Replace("\n","\\n")+"\"";
				} else {
					switch(TipoColuna(coluna)){
						case "real": retorno = ((decimal)celula).ToString("0.00", new CultureInfo("en-us")); break;
						case "int": retorno = celula.ToString(); break;
						case "text": retorno = "\""+celula.ToString().Replace("\\","\\\\").Replace("\"","\\\"").Replace("\n","\\n")+"\""; break;
						case "datetime":
							DateTime data = (DateTime)celula;
							retorno = "new Date(";
							retorno += data.Year.ToString()+",";
							retorno += (data.Month-1).ToString()+","; //No javascript os meses comecam no 0; Ex.: Jan = 0, Fev = 1...
							retorno += data.Day.ToString()+",";
							retorno += data.Hour.ToString()+",";
							retorno += data.Minute.ToString()+",";
							retorno += data.Second.ToString()+",";
							retorno += data.Millisecond.ToString()+")";
							break;
					}
				}
			}
			return(retorno);
		}
		
		//Verifica se a coluna tem um formato personalizado pelo usuario
		private static string ConverteCustom(DataColumn coluna, string colunasAexibir){
			string conversao = null;
			if(colunasAexibir!=null){
				string[] cols = colunasAexibir.Split(',');
				if(cols.Length > 0){
					foreach(string col in cols){
						if(col.Split('|')[0].ToLower().Trim()==coluna.ColumnName.ToLower()){
							if(col.Split('|').Length == 2){
								conversao = col.Split('|')[1];
							}
							break;
						}
					}
				}
			}
			return(conversao);
		}
		
		//Conferece se foi selecionado qual coluna exibir
		//Nunca exibr a coluna id e cs pois são padrões
		//Ex: colunasAexibir = tx_nome,nu_idade,fl_status  (Separador: ,)
		private static bool ColunaExibir(string colunasAexibir, string coluna){
			bool exibir = true;
			if((coluna.ToLower()=="id")||(coluna.ToLower()=="cs")){
				exibir = false;
			} else {
				if(colunasAexibir!=null){
					if(colunasAexibir.Length > 2){
						string[] cols = colunasAexibir.ToLower().Split(',');
						if(cols.Length > 0){
							exibir = false;
							foreach(string col in cols){
								if(col.Split('|')[0].Trim()==coluna.ToLower()){
									exibir = true;
									break;
								}
							}
						}
					}
				}
			}
			return(exibir);
		}
		
		private static string[] ColunaExibirSplit(string colunasAexibir, DataColumnCollection colunasBD){
			string[] colunasOK = new string[0];
			if(colunasAexibir!=null){
				if(colunasAexibir.Length > 2){
					string colunas = "";
					string[] cols = colunasAexibir.ToLower().Split(',');
					if(cols.Length > 0){
						foreach(string col in cols){
							if((col.Trim()!="id")&&(col.Trim()!="cs")){
								foreach(DataColumn colBD in colunasBD){
									if(col.Split('|')[0].Trim()==colBD.ColumnName.ToLower()){
										colunas += col.Split('|')[0].Trim() + ",";
										break;
									}
								}
							}
						}
					}
					if(colunas.Length > 0){
						colunas = colunas.Substring(0, colunas.Length-1);
						colunasOK = colunas.Split(',');
					}
				}
			}
			return(colunasOK);
		}
		
		public static string ToString(DataTable dados){
			return(ToString(dados, null));
		}
		
		//Transfoma um DataTable no formato Json
		public static string ToString(DataTable dados, string colunasAexibir){

			StringBuilder sb = new StringBuilder();
			if(dados!=null){
				string[] colunasExibirList = ColunaExibirSplit(colunasAexibir, dados.Columns);
				string con = "";
				bool temID = false;
				bool temCS = false;
				int colunaPos = 0;
				sb.Append(" { ");
				sb.Append(" columns : [ ");
				for (int i = 0; i < dados.Columns.Count; i++){
					if(dados.Columns[i].ColumnName.ToLower()=="id"){ temID = true; }
					if(dados.Columns[i].ColumnName.ToLower()=="cs"){ temCS = true; }
				}
				if(colunasExibirList.Length > 0){
					for (int e = 0; e < colunasExibirList.Length; e++){
						for (int i = 0; i < dados.Columns.Count; i++){
							if(colunasExibirList[e] == dados.Columns[i].ColumnName){
								sb.Append(con + "{ \"name\":\"" + dados.Columns[i].ColumnName + "\",");
								sb.Append("\"type\" : \""+TipoColuna(dados.Columns[i])+"\", ");
								sb.Append("\"pos\" : "+e.ToString()+" } ");
								con = " , ";
								break;
							}
						}
					}
				} else {
					colunaPos = 0;
					for (int i = 0; i < dados.Columns.Count; i++){
						if(ColunaExibir(colunasAexibir, dados.Columns[i].ColumnName)){
							sb.Append(con + "{ \"name\":\"" + dados.Columns[i].ColumnName + "\",");
							sb.Append("\"type\" : \""+TipoColuna(dados.Columns[i])+"\", ");
							sb.Append("\"pos\" : "+colunaPos.ToString()+" } ");
							con = " , ";
							colunaPos++;
						}
					}
				}
				sb.Append(" ], ");
				con = "";
				
				sb.Append(" cols : { ");
				for (int i = 0; i < dados.Columns.Count; i++){
					if(ColunaExibir(colunasAexibir, dados.Columns[i].ColumnName)){
						sb.Append(con + "\"" + dados.Columns[i].ColumnName + "\":");
						sb.Append("\""+TipoColuna(dados.Columns[i])+"\"");
						con = " , ";
					}
				}
				sb.Append(" }, ");
				con = "";
				
				colunaPos = 0;
				sb.Append(" col : { ");
				if(colunasExibirList.Length > 0){
					foreach(string colunaExibir in colunasExibirList){
						sb.Append(con + "\"" + colunaExibir + "\":");
						sb.Append(colunaPos.ToString());
						con = " , ";
						colunaPos++;
					}
				} else {
					for (int i = 0; i < dados.Columns.Count; i++){
						if(ColunaExibir(colunasAexibir, dados.Columns[i].ColumnName)){
							sb.Append(con + "\"" + dados.Columns[i].ColumnName + "\":");
							sb.Append(colunaPos.ToString());
							con = " , ";
							colunaPos++;
						}
					}
				}
				sb.Append(" }, ");
				con = "";
				
				sb.Append(" rows: [ ");
				for (int x = 0; x < dados.Rows.Count; x++){
					sb.Append(con + " { id: ");
					if(temID){ sb.Append(dados.Rows[x]["id"].ToString()); }
					else { sb.Append(x.ToString()); }
					sb.Append(", data:[");
					string conY = "";
					if(colunasExibirList.Length > 0){
						foreach(string colunaExibir in colunasExibirList){
							sb.Append(conY + Converte(dados.Columns[colunaExibir], dados.Rows[x][colunaExibir], colunasAexibir));
							conY = " , ";
						}
					} else {
						for (int y = 0; y < dados.Columns.Count; y++){
							if(ColunaExibir(colunasAexibir, dados.Columns[y].ColumnName)){
								sb.Append(conY + Converte(dados.Columns[y], dados.Rows[x][y]));
								conY = " , ";
							}
						}
					}
					sb.Append("], cs: ");
					if(temCS){ sb.Append(dados.Rows[x]["cs"].ToString()); }
					else { sb.Append("0"); }
					sb.Append(" } ");
					con = " , ";
				}
				sb.Append(" ] }; ");
			}
			return sb.ToString();
		}

	}

}