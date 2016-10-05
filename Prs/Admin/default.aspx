<%@ Page Language="C#" %>
<%@ Import Namespace="System.IO" %>
<script language="c#" runat="server">
string LoadJS(string path){
	string js = "";
	FileInfo[] files = (new DirectoryInfo(Server.MapPath(path))).GetFiles("*.js");
	foreach (FileInfo f in files){
		js += "<s"+"cript language=\"javascript\" src=\"../../"+f.FullName.Replace(Server.MapPath("/"), "").Replace("\\", "/")+"?nc="+DateTime.Now.Ticks.ToString()+"\"></s"+"cript>\n";
	}
	return(js);
}
</script>
<!DOCTYPE html>
<html lang="en">
  <head>
	<title>Admin Control</title>
  	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes">


	<link rel="stylesheet" type="text/css" href="../inc/js/webix/v.3.3.2/webix.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/css/webix_tw.css?nc=1" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/js/controls/sidebar/sidebar.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/js/controls/textmask.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/js/controls/moneymask.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/js/controls/locator.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/js/controls/textdb.css" media="screen" charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="../inc/css/bootstrap.min.css" media="screen" charset="utf-8" />

	<link rel="stylesheet" type="text/css" href="../inc/css/main.css" media="screen" charset="utf-8" />
  	<link rel="stylesheet" type="text/css" href="../inc/css/main_tw.css" media="screen" charset="utf-8" />
  </head>

	<body>
		<form id="Form1" runat="server">
			<asp:ScriptManager runat="server" ID="scriptManagerId" EnableScriptGlobalization="true">
			<Services><asp:ServiceReference  Path="~/App/Server/TW.WebService/Dados.asmx" /></Services>
			</asp:ScriptManager>
		</form>



		<script type="text/javascript" src="../inc/js/jquery/jquery-2.1.4.min.js"></script>
		<script type="text/javascript" src="../inc/js/webix/v.3.3.2/webix.js"></script>
		<script type="text/javascript" src="../inc/js/controls/sidebar/sidebar.js"></script>
		<script type="text/javascript" src="../inc/js/webix/i18n/pt-BR.js"></script>
		<script type="text/javascript" src="../inc/js/bootstrap.min.js"></script>

		<script language="javascript">
			var SYS_NAME = 'p86_admin';
			var twDateFormat = 'dd/MM/yyyy';
	  		var twMoneyFormat = '#.##0,00';
	  		var twMoneyThousands = ".";
	  		var twMoneyDecimal = ",";
	  		var twMoneyPrefix = "R$ ";
	  		var twMoneySuffix = "";
		</script>


		<%=LoadJS("../ctr/base")%>
		<%=LoadJS("../ctr")%>

		<script type="text/javascript" src="../inc/js/controls/googlemap.js"></script>
		<script type="text/javascript" src="../inc/js/controls/locator.js"></script>
		<script type="text/javascript" src="../inc/js/controls/textmask.js"></script>
		<script type="text/javascript" src="../inc/js/controls/moneymask.js"></script>
		<script type="text/javascript" src="../inc/js/controls/textdb.js"></script>

		<script type="text/javascript" src="../inc/js/swfupload.js"></script>
		<script type="text/javascript" src="../inc/js/swfupload.queue.js"></script>
		<script type="text/javascript" src="../inc/js/swfupload/fileprogress.js"></script>
		<script type="text/javascript" src="../inc/js/swfupload/handlers.js"></script>

		<%=LoadJS("../admin")%>
		<%=LoadJS("../admin/cliente")%>
		<%=LoadJS("../admin/horario")%>


		<script type="text/javascript">
		webix.i18n.setLocale("pt-BR");

	var _main = {
		go : function(url, callback){
			eval(url + '.go()');
			if ( callback ){ setTimeout(callback,100); }
		},
		menu : {
			cliente : [
				{ id : 'adm_cliente', 	value : 'Listar', name : 'Clientes', color : 'gold', icon : 'users' },
			],
			horario : [
				{ id : 'adm_horario', 	value : 'Listar', name : 'Horarios', color : 'gold', icon : 'clock-o' }
			]
		},
		listUI : [],
		modal : function(options){
			webix.ui({
				id : 'main_window',
				view:"window",
				css : 'mainWindow',
				modal:true,
				position:"center",
				maxWidth : options.maxWidth,
				maxHeight : options.maxHeight,
				head: {
					view:"toolbar",
					cols:[
						{ view:"label", label: options.title },
						{ view:"icon", icon:"close", hotkey:"esc", align: 'right', click:function(){ $$('main_window').close();  } }
					]
				},
				body: {
					view : 'scrollview',
					scroll : 'y',
					borderless : true,
					body : options.body
				}
			}).show();

		}
	}

	_main.listUI.push(webix.copy(adm_home));
	for ( var x in _main.menu ){
		try {
			var obj = webix.copy( eval(_main.menu[x][0].id) );
			_main.listUI.push(obj);
		} catch (ex) {}
	}

	console.log(_main.listUI);


	webix.ready(function(){
		webix.i18n.setLocale("pt-BR");
		//if (!webix.env.touch && webix.ui.scrollSize){ webix.CustomScroll.init(); }

		webix.ui({
			id : 'main',
			view:"layout",
			borderless : true,
			rows : [
				{
					view:"toolbar",
					cols:[
						{ view:"button", type:"icon", icon:"bars", width:37, css:"app_button", click:function(){ $$("main_menu").toggle(); } },
						{ view:"label", label: 'Controle Administrativo' }
					]
				},
				{
					id : "main_form",
					view: "form",
					type: "clean",
					rows : [
						{
							cols : [
								{
									id : "main_menu",
									view: "sidebar",
									collapsed: true,
									width:170,
									data : [
										{ id : 'adm_home', 	 	value : 'Site', 	icon : 'home' },
										{ id : 'adm_cliente', 	 	value : 'Clientes', 	icon : 'users' },
										{ id : 'adm_horario', 	 	value : 'Horarios', 	icon : 'clock-o' }
										/*,
										{ id : 'adm_exposicao', value : 'Exposição', 	icon : 'eye' },
										{ id : 'adm_galeria', 	value : 'Galeria', 		icon : 'camera' },
										{ id : 'adm_arte', 	 	value : 'Arte & Poesia', icon : 'quote-left' },
										{ id : 'adm_evento', 	value : 'Evento', 		icon : 'clock-o-o' },
										{ id : 'adm_sobre', 	value : 'Sobre', 		icon : 'info' },
										{ id : 'adm_contato', 	value : 'Contato', 		icon : 'envelope' }*/
									],
									on:{ onAfterSelect: function(id){
											console.log(id)

											_main.go(id,function(){
													$$(id).show();
											});
										}
									}
								},
								{
									view: "multiview",
									animate : false,
									cells: _main.listUI.slice()
								}
							]
						}
					]
				}
			]
		});

		setTimeout(function(){
			$$('main').show();
			var sidebar = $$('main_menu');
			sidebar.blockEvent();
			adm_home.go(function(){
				sidebar.select('adm_home');
				sidebar.unblockEvent();
			});
		}, 50);
	});

</script>

	</body>
</html>
