var twNCM = function(params){
	var viewID = params.id;
	return $.extend(params, {
		id : viewID,
		view : 'textmask',
		inputmask : "99999999",
		popup : {
			id : viewID+'_popup',
			viewID : viewID,
			view : "popup",
			resize:true,
			maxWidth : 580,
			maxHeight : 580,
			on : {
				onShow : function(){
					var filters = $$(this.config.viewID + '_filters');
					var chapter = $$(this.config.viewID + '_chapter');
					filters.define('animate', false);
					chapter.show();
					filters.define('animate', true);
					if(!chapter.count()){
						twApi(
							'baseBrNcm/chapter/list',
							{},
							function(r){
								if(r.status==200){
									chapter.clearAll();
									chapter.parse(r.response.map(function(c){
										return {
											'id' : c._id,
											'name' : c.name,
											'count' : c.count,
											'type' : c.type,
											'$css' : 'webix_group'
										};
									}));
								}
							}
						);
					}
				}
			},
			body : {
				id : viewID+'_filters',
				viewID : viewID,
				view : 'multiview',
				borderless:true,
				cells : [
					{
						id : viewID+'_chapter',
						viewID : viewID,
						view : 'list',
						template : function(obj){
							return '<div style="width: 95%;" class="text_ellipsis">' + obj.id + ' - ' + obj.name + '</div> <div class="webix_arrow_icon"></div>';
						},
						data : [],
						on : {
							onItemClick : function(id, e){
								var obj = webix.copy($$(this).getItem(id));
								obj.$css = 'webix_group_back';
								var position = $$(this.config.viewID+'_position');
								if(!position.config['cache_'+id.toString()]){
									twApi(
										'baseBrNcm/position/list',
										{ 'chapter' : { '_id' : id.toString() } },
										function(r){
											if(r.status==200){
												var list = [obj];
												r.response.forEach(function(c){
													list.push({
														'id' : c._id,
														'name' : c.name,
														'count' : c.count,
														'type' : c.type,
														'parentID' : id,
														'$css' : 'webix_group'
													});
												});
												position.define('cache_'+id.toString(), list);
												position.clearAll();
												position.parse(list);
												position.show();
											}
										}
									);
								} else {
									position.clearAll();
									position.parse(position.config['cache_'+id.toString()]);
									position.show();
								}
							}
						}
					},
					{
						id : viewID+'_position',
						viewID : viewID,
						view : 'list',
						template : function(obj){
							return '<div style="width: 98%;" class="text_ellipsis">' + obj.id + ' - ' + obj.name + '</div>' +(obj.type=='chapter'||obj.count?' <div class="webix_arrow_icon"></div>':'');
						},
						data : [],
						on : {
							onItemClick : function(id){
								var obj = webix.copy($$(this).getItem(id));
								var chapter = $$(this.config.viewID+'_chapter');
								
								if(obj.type=='chapter'){
									chapter.show();
								} else {
									if(obj.count){
										var objChapter = webix.copy(chapter.getItem(obj.parentID));

										obj.$css = 'webix_group_back';
										objChapter.$css = 'webix_group_back';

										var subposition1 = $$(this.config.viewID+'_subposition1');
										if(!subposition1.config['cache_'+id.toString()]){
											twApi(
												'baseBrNcm/subposition1/list',
												{ 'position' : { '_id' : id.toString() } },
												function(r){
													if(r.status==200){
														var list = [objChapter, obj];
														r.response.forEach(function(c){
															list.push({
																'id' : c._id,
																'name' : c.name,
																'count' : c.count,
																'type' : c.type,
																'parentID' : id,
																'$css' : 'webix_group'
															});
														});
														subposition1.define('cache_'+id.toString(), list);
														subposition1.clearAll();
														subposition1.parse(list);
														subposition1.show();
													}
												}
											);
										} else {
											subposition1.clearAll();
											subposition1.parse(subposition1.config['cache_'+id.toString()]);
											subposition1.show();
										}
									} else {
										$$(this.config.viewID).setValue(id);
										$$(this.config.viewID+'_popup').hide();
									}
								}
							}
						}
					},
					{
						id : viewID+'_subposition1',
						viewID : viewID,
						view : 'list',
						template : function(obj){
							return '<div style="width: 98%;" class="text_ellipsis">' + obj.id + ' - ' + obj.name + '</div>' +(['chapter','position'].indexOf(obj.type)>=0||obj.count?' <div class="webix_arrow_icon"></div>':'');
						},
						data : [],
						on : {
							onItemClick : function(id){
								var obj = $$(this).getItem(id);
								var chapter = $$(this.config.viewID+'_chapter');
								var position = $$(this.config.viewID+'_position');
								if(obj.type=='chapter'){
									chapter.show();
								} else if(obj.type=='position'){
									position.show();
								} else {
									if(obj.count){
										var objPosition = webix.copy(position.getItem(obj.parentID));
										var objChapter = webix.copy(chapter.getItem(objPosition.parentID));

										obj.$css = 'webix_group_back';
										objPosition.$css = 'webix_group_back';
										objChapter.$css = 'webix_group_back';

										var subposition2 = $$(this.config.viewID+'_subposition2');
										if(!subposition2.config['cache_'+id.toString()]){
											twApi(
												'baseBrNcm/subposition2/list',
												{ 'subposition1' : { '_id' : id.toString() } },
												function(r){
													if(r.status==200){
														var list = [objChapter, objPosition, obj];
														r.response.forEach(function(c){
															list.push({
																'id' : c._id,
																'name' : c.name,
																'count' : c.count,
																'type' : c.type,
																'parentID' : id,
																'$css' : 'webix_group'
															});
														});
														subposition2.define('cache_'+id.toString(), list);
														subposition2.clearAll();
														subposition2.parse(list);
														subposition2.show();
													}
												}
											);
										} else {
											subposition2.clearAll();
											subposition2.parse(subposition2.config['cache_'+id.toString()]);
											subposition2.show();
										}
									} else {
										$$(this.config.viewID).setValue(id);
										$$(this.config.viewID+'_popup').hide();
									}
								}
							}
						}
					},
					{
						id : viewID+'_subposition2',
						viewID : viewID,
						view : 'list',
						template : function(obj){
							return '<div style="width: 98%;" class="text_ellipsis">' + obj.id + ' - ' + obj.name + '</div>' +(['chapter','position','subposition1'].indexOf(obj.type)>=0||obj.count?' <div class="webix_arrow_icon"></div>':'');
						},
						data : [],
						on : {
							onItemClick : function(id){
								var obj = $$(this).getItem(id);

								var chapter = $$(this.config.viewID+'_chapter');
								var position = $$(this.config.viewID+'_position');
								var subposition1 = $$(this.config.viewID+'_subposition1');

								if(obj.type=='chapter'){
									chapter.show();
								} else if(obj.type=='position'){
									position.show();
								} else if(obj.type=='subposition1'){
									subposition1.show();
								} else {
									if(obj.count){
										var objSubPosition1 = webix.copy(subposition1.getItem(obj.parentID));
										var objPosition = webix.copy(position.getItem(objSubPosition1.parentID));
										var objChapter = webix.copy(chapter.getItem(objPosition.parentID));

										obj.$css = 'webix_group_back';
										objSubPosition1.$css = 'webix_group_back';
										objPosition.$css = 'webix_group_back';
										objChapter.$css = 'webix_group_back';

										var item = $$(this.config.viewID+'_item');
										if(!item.config['cache_'+id.toString()]){
											twApi(
												'baseBrNcm/item/list',
												{ 'subposition2' : { '_id' : id.toString() } },
												function(r){
													if(r.status==200){
														var list = [objChapter, objPosition, objSubPosition1, obj];
														r.response.forEach(function(c){
															list.push({
																'id' : c._id,
																'name' : c.name,
																'count' : c.count,
																'type' : c.type,
																'parentID' : id,
																'$css' : 'webix_group'
															});
														});
														item.define('cache_'+id.toString(), list);
														item.clearAll();
														item.parse(list);
														item.show();
													}
												}
											);
										} else {
											item.clearAll();
											item.parse(item.config['cache_'+id.toString()]);
											item.show();
										}
									} else {
										$$(this.config.viewID).setValue(id);
										$$(this.config.viewID+'_popup').hide();
									}
								}
							}
						}
					},
					{
						id : viewID+'_item',
						viewID : viewID,
						view : 'list',
						template : function(obj){
							return '<div style="width: 98%;" class="text_ellipsis">' + obj.id + ' - ' + obj.name + '</div>' +(['chapter','position','subposition1','subposition2'].indexOf(obj.type)>=0||obj.count?' <div class="webix_arrow_icon"></div>':'');
						},
						data : [],
						on : {
							onItemClick : function(id){
								var obj = $$(this).getItem(id);
								if(obj.type=='chapter'){
									$$(this.config.viewID+'_chapter').show();
								} else if(obj.type=='position'){
									$$(this.config.viewID+'_position').show();
								} else if(obj.type=='subposition1'){
									$$(this.config.viewID+'_subposition1').show();
								} else if(obj.type=='subposition2'){
									$$(this.config.viewID+'_subposition2').show();
								} else {
									$$(this.config.viewID).setValue(id);
									$$(this.config.viewID+'_popup').hide();
								}
							}
						}
					}
				]
			}
		}
	});
};