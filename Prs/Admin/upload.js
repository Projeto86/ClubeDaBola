var adm_upload = {
	id : "adm_upload",
	view:"window",
	modal:true,
	maxWidth: 400,
	position:"center",
	head: {
		view:"toolbar",
		cols:[
			{ view:"label", label: 'Adicionar imagem' },
			{ view:"icon", icon:"close", hotkey:"esc", align: 'right', click:function(){ $$("adm_upload").close(); } }
		]
	},
	body: {
		id: "teste",
		view: "form",
		rows : [
			{
				view : 'template',
				css : 'nopadding',
				autoheight : true,
				borderless : true,
				template : '<div id="myDivFoto"><div  id="dvFoto"><span class="titulo-cinza-15-bold">Clique no botãoo abaixo, e escolha as fotos em seu computador.<span style="font-size: 10px">(limite de 4 MB)</span></span><br><div><div style="float:left"><span id="spanButtonPlaceHolder"></span></div><div style="float:right"><input id="btnCancel" type="button" value="Cancelar envio" onclick="swfu.cancelQueue();" disabled="disabled" style="margin-left: 2px; font-size: 8pt; height:24px;" /></div></div></div><div style="clear:both">&nbsp;</div><div id="fsUploadProgress" style="width:100%; height:220px; overflow: auto; margin-bottom: 5px"></div><div id="divStatus" class="titulo-cinza-15-bold"></div></div>'
			}
		]
	},
	open : function(callback){
		webix.ui(webix.copy(adm_upload)).show();


		var swfu = new SWFUpload({
			flash_url : "http://sidney.projeto86.com.br/prs/inc/swf/swfupload.swf",
			flash9_url : "http://sidney.projeto86.com.br/prs/inc/swf/swfupload_fp9.swf",
			upload_url: "http://sidney.projeto86.com.br/prs/admin/ajax/upload.aspx",
			post_params: { "u" : "1", "e" : "1", "a" : "1" },
			file_size_limit : "20 MB",
			file_types : "*.jpg;*.png;*.bmp;*.tif;*.jpeg;*.tiff",
			file_types_description : "Apenas imagens",
			file_upload_limit : 100,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel",
				fctCompleted : function(){
					//history.go(0);
					//parent.album.fotos.listar();
				}
			},
			debug: false,

			// Button settings
			//button_image_url: "/Prs/Img/swfupload/XPButtonNoText_160x22.png",
			button_width: "160",
			button_height: "22",
			button_placeholder_id: "spanButtonPlaceHolder",
			button_text: '<span class="theFont">Escolher fotos</span>',
			button_text_style: ".theFont { font-family:verdana; font-size: 12pt; }",
			button_text_left_padding: 5,
			button_text_top_padding: 1,

			// The event handler functions are defined in handlers.js
			swfupload_preload_handler : preLoad,
			swfupload_load_failed_handler : loadFailed,
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete	// Queue plugin event
		});


	}
};
