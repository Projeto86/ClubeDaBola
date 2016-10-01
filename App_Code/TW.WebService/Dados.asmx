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
    [WebService(Namespace = "http://livre.twla.com.br/", Name = "Dados")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ScriptService]
    public class Dados : System.Web.Services.WebService {

        [WebMethod]
		[ScriptMethod]
		public string ToJson(string procedure, string[] campos, object[] valores, string colunas){
            if(campos.Length != valores.Length){ return("erro-campo-valor"); }
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			DataTable dt = BDConvercao.ParaTabelaDados(BDComando.PegarDados(query));
			return (Json.ToString(dt, colunas));
		}

        [WebMethod]
		[ScriptMethod]
		public string ToText(string procedure, string[] campos, object[] valores){
            if(campos.Length != valores.Length){ return("erro-campo-valor"); }
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			return (BDConvercao.ParaTexto(BDComando.PegarDados(query)));
		}

        [WebMethod]
		[ScriptMethod]
		public void Execute(string procedure, string[] campos, object[] valores){
            if(campos.Length != valores.Length){ return; }
			BDParametro query = new BDParametro(procedure);
            for(int x = 0; x < campos.Length; x++){ if(valores[x]!=null){ query.Adicionar(campos[x], valores[x]); } }
			BDComando.Executar(query);
		}

    }

}