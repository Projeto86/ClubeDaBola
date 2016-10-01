<%@ WebService Language="C#" Class="TW.WebService.Dados" %>
using System;
using System.Data;
using System.Globalization;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Web.Script.Services;
using TW.Sistema.Dados;
using TW.Sistema;

namespace TW.WebService
{

	//Classe chamada em: App/Client/tw/twJscSistemaDados.js   (twJscSistemaDados.procedure)

    [WebService(Namespace = "http://sidney.projeto86.com.br//", Name = "Dados")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ScriptService]
    public class Dados : System.Web.Services.WebService {

		private void Converte(ref string[] campos, ref object[] valores){
			for(int x = 0; x < campos.Length; x++){
				if(campos[x].IndexOf("@dt_")==0){
					if(valores[x] != null){
						if(valores[x].GetType().ToString() == "System.String"){
							valores[x] = Convert.ToDateTime((string)valores[x], new CultureInfo("pt-br"));
						}
					}
				}
			}
		}

        [WebMethod]
		[ScriptMethod]
		public string ToJson(string procedure, string[] campos, object[] valores, string colunas){
            if(campos.Length != valores.Length){ return("erro-campo-valor"); }
			Converte(ref campos, ref valores);
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			DataTable dt = BDConvercao.ParaTabelaDados(BDComando.PegarDados(query));
			return (Json.ToString(dt, colunas));
		}

        [WebMethod]
		[ScriptMethod]
		public string ToString(string procedure, string[] campos, object[] valores){
            if(campos.Length != valores.Length){ return("erro-campo-valor"); }
			Converte(ref campos, ref valores);
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			return (BDConvercao.ParaTexto(BDComando.PegarDados(query)));
		}

        [WebMethod]
		[ScriptMethod]
		public void Execute(string procedure, string[] campos, object[] valores){
            if(campos.Length != valores.Length){ return; }
			Converte(ref campos, ref valores);
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			BDComando.Executar(query);
		}

    }

}
