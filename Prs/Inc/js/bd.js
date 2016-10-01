var collection = {
	player : {
		bd : [
			{ last : 12, average : 9.5, games : 5, id : 1,  name : 'João Pedro', type : 'M', alias : 'JP Zizu', tel : '(13) 99766-5181', level : 5, pos : 1, img : 'https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/196981_484478788261077_2029978439_n.jpg?oh=195419042ae85b2d85c7463723af3f49&oe=581E519C' },
			{ last : 5.2, average : 5, games : 10, id : 2,  name : 'Thiago Mascaro', type : 'M', alias : 'Thiagão', tel : '(13) 99766-5181', level : 5, pos : 2, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-1/p160x160/12003349_10153720355872994_5903342327417252552_n.jpg?oh=288d0bb1a26e36a70d5fccd5f8e8253b&oe=581CD16C' },
			{ last : 5.3, average : 5, games : 10, id : 3,  name : 'Murilo Nunes', type : 'M', alias : 'Muca', tel : '(13) 99766-5181', level : 5, pos : 2, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/10553346_749200771795509_5833900195112076061_n.jpg?oh=e36c6ee0077f576e729bbb785e577f33&oe=582C474F'  },
			{ last : 5.4, average : 5, games : 10, id : 4,  name : 'Lesma', type : 'M', alias : 'Lesma', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 5.5, average : 5, games : 10, id : 5,  name : 'Thiago Papa', type : 'M', alias : 'Papa', tel : '(13) 99766-5181', level : 5, pos : 3 },

			{ last : 5.6, average : 5, games : 10, id : 6,  name : 'Amaral', type : 'M', 		alias : 'Amaral', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/13321953_10209485024192798_2242224372287861166_n.jpg?oh=ee694a624d84baa686bb4223e29f716c&oe=5833D2A9' },
			{ last : 5.7, average : 5, games : 10, id : 7,  name : 'Bruno', type : 'M', 		alias : 'Bruninho', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 5.8, average : 5, games : 10, id : 8,  name : 'Alexandre', type : 'M', 	alias : 'But', tel : '(13) 99766-5181', level : 5, pos : 3 , img : 'https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/535659_438032382935652_1609946485_n.jpg?oh=b89010a55371a600757d5b83885c9a13&oe=58149455'},
			{ last : 5.9, average : 5, games : 10, id : 9,  name : 'Jeferson', type : 'M', 	alias : 'Jeff', tel : '(13) 99766-5181', level : 5, pos : 3 , img : 'https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/10440853_692609957496225_3600114725152924014_n.jpg?oh=4315bb747476031ef3c38d1256a2638b&oe=58189EEF'},
			{ last : 6,   average : 5, games : 10, id : 10, name : 'Leandro', type : 'M', 	alias : 'Cabeção', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 6,   average : 5, games : 10, id : 11, name : 'Leandro Gouvea', type : 'M', 	alias : 'Lingua', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/960249_10151739510230518_1890466234_n.jpg?oh=7826fac39d3b9da1ccbf0e9f58d18247&oe=581C90C6'  },
			{ last : 6,   average : 5, games : 10, id : 12, name : 'Nakai', type : 'M', 		alias : 'Nakai', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 6.9, average : 5, games : 10, id : 13, name : 'Rodrigo', type : 'M', 	alias : 'Oliveira', tel : '(13) 99766-5181', level : 5, pos : 3, img: 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/12074660_922094687858052_3103994780786661989_n.jpg?oh=8777eafac9a8b4b1ff6c144c1152f1f3&oe=581E261B' },
			{ last : 6.8, average : 5, games : 10, id : 14, name : 'André Simonian', type : 'M', 		alias : 'Panda', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/11139976_1028317040563933_5058884058930291275_n.jpg?oh=bbe4a4f6c7b3a22e48b10b273dbd2f54&oe=58299FD9' },
			{ last : 6.7, average : 5, games : 10, id : 15, name : 'Pepê', type : 'M', 		alias : 'Pepê', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 6.6, average : 5, games : 10, id : 16, name : 'Portella', type : 'M', 	alias : 'Portella', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-2.fna.fbcdn.net/v/t1.0-9/12745598_135681703485791_6558324288655341747_n.jpg?oh=0043cb6e4cb0ea70193cd49bb1835e19&oe=58332F43' },
			{ last : 6.5, average : 5, games : 10, id : 17, name : 'Roni', type : 'M', 		alias : 'Roni', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/405201_207681772650718_57624405_n.jpg?oh=efb990aed79af59275b36a3452850428&oe=57EA9DDA' },
			{ last : 6.4, average : 5, games : 10, id : 18, name : 'Zaza', type : 'M', 		alias : 'Zaza', tel : '(13) 99766-5181', level : 5, pos : 3, img : 'https://scontent.fsdu2-1.fna.fbcdn.net/v/t1.0-9/12107980_902450556476535_756715310275206133_n.jpg?oh=a5989417e4d9aad6b407bdc7df469265&oe=582A7651' },
			{ last : 6.3, average : 5, games : 10, id : 19, name : 'Mudinho', type : 'M', 	alias : 'Mudinho', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 6.2, average : 5, games : 10, id : 20, name : 'Zé', type : 'M', 		alias : 'Zé', tel : '(13) 99766-5181', level : 5, pos : 3 },
			{ last : 6.1, average : 5, games : 10, id : 21, name : 'Gil', type : 'M', 		alias : 'Gil', tel : '(13) 99766-5181', level : 5, pos : 3 },
		],
		get : function(id, callabck){
			var sel = {};
			for ( var x in collection.player.bd ){
				if ( collection.player.bd[x].id == id ){
					sel = collection.player.bd[x];
					break;
				}
			}
			callabck(sel);
		},
		list : function (filter, callback){
			callback(collection.player.bd);
		},
		add : function(objPlayer, callback){
			var objReturn = { error : '', ok : true };
			if (!objPlayer.name || objPlayer.name==='') { objReturn.ok = false; objReturn.error = 'Indique o nome do jogador'; }
			if (!objPlayer.type || objPlayer.type.length!=1) { objReturn.ok = false; objReturn.error = 'Informe se é mensalista ou avulso'; }

			if (objReturn.ok){
				objPlayer.id = collection.player.bd.length;
				collection.player.bd.push($.extend({},objPlayer));

				console.log('Add player');
				console.log(collection.player.bd[collection.player.bd.length-1]);
			}
			callback(objReturn);
		},
		update : function(objPlayer,callback){
			var objReturn = { error : 'Não foi possível encontrar o registro', ok : false };
			for ( var x in collection.player.bd ){
				if ( collection.player.bd[x].id == objPlayer.id ){
					collection.player.bd[x] = objPlayer;
					objReturn.error = '';
					objReturn.ok = true;
					break;
				}
			}
			callback(objReturn);
		},
		delete : function(id,callback){
			var objReturn = { error : 'Não foi possível encontrar o registro', ok : false };
			for ( var x in collection.player.bd ){
				if ( collection.player.bd[x].id == objPlayer.id ){
					collection.player.bd.slice(x,1);
					objReturn.error = '';
					objReturn.ok = true;
					break;
				}
			}
			callback(objReturn);
		}
	},
	payment : {
		bd : [
			{
				month : 1,
				list : [
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 2,
				list : [
					{ playerID : 9,  value : 50, name : 'Jeferson' },
					{ playerID : 10, value : 50, name : 'Leandro' },
					{ playerID : 11, value : 50, name : 'Lingua' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 13, value : 50, name : 'Oliveira' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 3,
				list : [
					{ playerID : 3,  value : 50, name : 'Murilo Nunes' },
					{ playerID : 4,  value : 50, name : 'Lesma' },
					{ playerID : 5,  value : 50, name : 'Thiago Papa' },
					{ playerID : 6,  value : 50, name : 'Amaral' },
					{ playerID : 7,  value : 50, name : 'Bruno' },
					{ playerID : 8,  value : 50, name : 'Alexandre' },
					{ playerID : 9,  value : 50, name : 'Jeferson' },
					{ playerID : 10, value : 50, name : 'Leandro' },
					{ playerID : 11, value : 50, name : 'Lingua' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 13, value : 50, name : 'Oliveira' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 4,
				list : [
					{ playerID : 1,  value : 50, name : 'João Pedro' },
					{ playerID : 2,  value : 50, name : 'Thiago Mascaro' },
					{ playerID : 3,  value : 50, name : 'Murilo Nunes' },
					{ playerID : 4,  value : 50, name : 'Lesma' },
					{ playerID : 5,  value : 50, name : 'Thiago Papa' },
					{ playerID : 6,  value : 50, name : 'Amaral' },
					{ playerID : 7,  value : 50, name : 'Bruno' },
					{ playerID : 8,  value : 50, name : 'Alexandre' },
					{ playerID : 9,  value : 50, name : 'Jeferson' },
					{ playerID : 10, value : 50, name : 'Leandro' },
					{ playerID : 11, value : 50, name : 'Lingua' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 13, value : 50, name : 'Oliveira' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 5,
				list : [
					{ playerID : 1,  value : 50, name : 'João Pedro' },
					{ playerID : 2,  value : 50, name : 'Thiago Mascaro' },
					{ playerID : 3,  value : 50, name : 'Murilo Nunes' },
					{ playerID : 4,  value : 50, name : 'Lesma' },
					{ playerID : 5,  value : 50, name : 'Thiago Papa' },
					{ playerID : 6,  value : 50, name : 'Amaral' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 13, value : 50, name : 'Oliveira' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 6,
				list : [
					{ playerID : 1,  value : 50, name : 'João Pedro' },
					{ playerID : 2,  value : 50, name : 'Thiago Mascaro' },
					{ playerID : 3,  value : 50, name : 'Murilo Nunes' },
					{ playerID : 4,  value : 50, name : 'Lesma' },
					{ playerID : 5,  value : 50, name : 'Thiago Papa' },
					{ playerID : 6,  value : 50, name : 'Amaral' },
					{ playerID : 7,  value : 50, name : 'Bruno' },
					{ playerID : 8,  value : 50, name : 'Alexandre' },
					{ playerID : 9,  value : 50, name : 'Jeferson' },
					{ playerID : 10, value : 50, name : 'Leandro' },
					{ playerID : 11, value : 50, name : 'Lingua' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 13, value : 50, name : 'Oliveira' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }
				]
			},
			{
				month : 7,
				list : [
					{ playerID : 1,  value : 50, name : 'João Pedro' },
					{ playerID : 2,  value : 50, name : 'Thiago Mascaro' },
					{ playerID : 3,  value : 50, name : 'Murilo Nunes' },
					{ playerID : 5,  value : 50, name : 'Thiago Papa' },
					{ playerID : 6,  value : 50, name : 'Amaral' },
					{ playerID : 7,  value : 50, name : 'Bruno' },
					{ playerID : 8,  value : 50, name : 'Alexandre' },
					{ playerID : 9,  value : 50, name : 'Jeferson' },
					{ playerID : 10, value : 50, name : 'Leandro' },
					{ playerID : 12, value : 50, name : 'Nakai' },
					{ playerID : 14, value : 50, name : 'André Simonian' },
					{ playerID : 15, value : 50, name : 'Pepê' },
					{ playerID : 17, value : 50, name : 'Roni' },
					{ playerID : 18, value : 50, name : 'Zaza' },
					{ playerID : 19, value : 50, name : 'Mudinho' },
					{ playerID : 20, value : 50, name : 'Zé' },
					{ playerID : 21, value : 50, name : 'Gil' }

				]
			},
			{
				month : 8,
				list : [
					{ playerID:1, name : 'João Pedro', value: 50 },
					{ playerID:2, name : 'Thiago Mascaro', value:50 },
					{ playerID:3, name : 'Murilo Nunes', value:50  }
				]
			}
		],
		get : function(id, callabck){
			var sel = {};
			for ( var x in collection.payment.bd ){
				if ( collection.payment.bd[x].id == id ){
					sel = collection.payment.bd[x];
					break;
				}
			}
			callabck(sel);
		},
		list : function (filter, callback){
			var listPay = [];
			var objReturn = [];
			var amount = 0;

			if ( filter ) {
				for ( var x in collection.payment.bd){
					if ( filter.month == collection.payment.bd[x].month){
						listPay = $.extend({},collection.payment.bd[x].list);
						break;
					}
				}

				objReturn = collection.player.bd.map(function(p){
					for ( var i in listPay ){
						if (p.id== listPay[i].playerID){
							return null;
						}
					}
					var obj =  { playerID : p.id, name : p.name, value: 0 };
					if ( p.img ) obj.img = p.img;
					return obj;
				});

				objReturn = objReturn.filter(function(m){ return m!==null });

				objReturn.sort(function(a, b){
					if(a.name < b.name) return -1;
				    if(a.name > b.name) return 1;
				    return 0;
				});

				for ( var y in listPay){
					amount += parseFloat(listPay[y].value);
				}

			} else {

				for ( var x in collection.payment.bd){


					var listPayIn = collection.payment.bd[x].list;
					var amountIn = 0;
					for ( var y in listPayIn){
						amountIn += parseFloat(listPayIn[y].value);
					}

					objReturn.push({
						id : x+1,
						month : collection.payment.bd[x].month,
						value : amountIn
					});

					amount += parseFloat(amountIn);
				}
			}
			callback({list : objReturn, total : amount});
		},
		add : function(objPayment, callback){
			var objReturn = { error : '', ok : true };
			if (!objPayment.name || objPayment.name==='') { objReturn.ok = false; objReturn.error = 'Indique o nome do jogador'; }
			if (!objPayment.playerID) { objReturn.ok = false; objReturn.error = 'Informe o jogador'; }
			if (!objPayment.value) { objReturn.ok = false; objReturn.error = 'Informe o valor do pagamento'; }

			if (objReturn.ok){
				for ( var x in collection.payment.bd){
					if ( parseInt(collection.payment.bd[x].month) === parseInt(objPayment.month) ){
						objPayment.id = collection.payment.bd[x].list.length;
						delete objPayment.month;
						collection.payment.bd[x].list.push($.extend({},objPayment));
						break;
					}
				}
				console.log('Add payment');
			}
			callback(objReturn);
		},
		update : function(objPayment,callback){
			var objReturn = { error : 'Não foi possível encontrar o registro', ok : false };
			for ( var x in collection.payment.bd ){
				if ( collection.payment.bd[x].id == objPayment.id ){
					collection.payment.bd[x] = objPayment;
					objReturn.error = '';
					objReturn.ok = true;
					break;
				}
			}
			callback(objReturn);
		},
		delete : function(id,callback){
			var objReturn = { error : 'Não foi possível encontrar o registro', ok : false };
			for ( var x in collection.payment.bd ){
				if ( collection.payment.bd[x].id == objPayment.id ){
					collection.payment.bd.slice(x,1);
					objReturn.error = '';
					objReturn.ok = true;
					break;
				}
			}
			callback(objReturn);
		}
	}

};
