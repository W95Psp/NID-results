'use strict';

var app = angular.module('app', ['ngCytoscape']);

// document.body.innerHTML = 'asdsa';

app.config(['$httpProvider', function ($httpProvider) {
	if (!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);

app.controller('ctrl', function ($scope, $http) {
	$scope.loading = true;
	$scope.selected = undefined;
	$scope.list = [];
	var HASH = window.location.hash[0] == '#' ? window.location.hash.substr(1) : window.location.hash;
	$scope.hash = HASH;
	$scope.layout = { name: 'dagre' };
	// if(HASH.indexOf('jpeg')==0){
	// 	$scope.style = [
	// 		{
	// 			selector: 'node',
	// 			style: {
	// 				'content': '',
	// 				'width': '50',
	// 				'height': '50',
	// 				'background-image': 'url(data(id))',
	// 				'text-background-color': 'white',
	// 				'text-background-opacity': '0.8',
	// 				'font-size': '50px',
	// 				'font-family': '"Open Sans Condensed", "Open Sans Condensed Light"',
	// 				'letter-spacing': '-1px'
	// 			}
	// 		}, {
	// 			selector: 'node[emptyNode=123]',
	// 			style: {
	// 				'content': '',
	// 				'width': '1',
	// 				'height': '1'
	// 			}
	// 		}
	// 	];
	// }else{
	$scope.style = [{
		selector: 'node',
		style: {
			'content': 'data(id)',
			'width': '12',
			'height': '12',
			'background-color': '#ddd',
			'text-background-color': 'white',
			'text-background-opacity': '0.8',
			'font-size': '50px',
			'font-family': '"Open Sans Condensed", "Open Sans Condensed Light"',
			'letter-spacing': '-1px'
		}
	}, {
		selector: 'node[emptyNode=123]',
		style: {
			'content': '',
			'width': '1',
			'height': '1'
		}
	}, {
		selector: '#a_jpeg',
		style: {
			'content': '',
			'background-image': 'url("a_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#b_jpg',
		style: {
			'content': '',
			'background-image': 'url("b_jpg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#c_jpeg',
		style: {
			'content': '',
			'background-image': 'url("c_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#d_jpeg',
		style: {
			'content': '',
			'background-image': 'url("d_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#e_jpeg',
		style: {
			'content': '',
			'background-image': 'url("e_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#f_jpeg',
		style: {
			'content': '',
			'background-image': 'url("f_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#g_jpeg',
		style: {
			'content': '',
			'background-image': 'url("g_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#h_jpeg',
		style: {
			'content': '',
			'background-image': 'url("h_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#i_jpeg',
		style: {
			'content': '',
			'background-image': 'url("i_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#j_jpeg',
		style: {
			'content': '',
			'background-image': 'url("j_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#k_jpeg',
		style: {
			'content': '',
			'background-image': 'url("k_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#l_jpeg',
		style: {
			'content': '',
			'background-image': 'url("l_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}, {
		selector: '#m_jpeg',
		style: {
			'content': '',
			'background-image': 'url("m_jpeg")',
			'width': '220px',
			'height': '220px'
		}
	}];
	// }
	$scope.listCat = [];
	var updateListCat = function updateListCat() {
		while ($scope.listCat.length) {
			$scope.listCat.pop();
		}
		var _loop = function _loop(i) {
			var n = $scope.list[i].name.replace(/-[^-]+$/, '');
			var ob = $scope.listCat.filter(function (o) {
				return o.name == n;
			})[0];
			if (!ob) {
				console.log('add');
				$scope.listCat.push({
					name: n,
					list: [$scope.list[i]]
				});
			} else ob.list.push($scope.list[i]);
		};

		for (var i in $scope.list) {
			_loop(i);
		}
	};
	var finishLoad = function finishLoad() {
		if (HASH) {
			$scope.selectedCat = $scope.listCat[0];
			$scope.selected = $scope.selectedCat.list[0].id;
		}
		console.log('finished', $scope.list);
		$scope.loading = false;
	};
	var loadThisOne = function loadThisOne(name, callback) {
		if (HASH && HASH.indexOf(name + '|') == -1) {
			console.log('skip', name, HASH);
			return callback();
		}
		var dir = 'listResults/' + name + '/';

		$http.get(dir + 'names.csv').then(function (_ref) {
			var data = _ref.data;

			var nodesNames = data.split('\n');
			$http.get(dir + 'test.json').then(function (_ref2) {
				var data = _ref2.data;

				var edges = data;
				var o = {};
				for (var i = nodesNames.length - 1; i < edges.length; i++) {
					nodesNames.push(':' + i);
				}var elems = nodesNames.map(function (o) {
					var obj = { data: { id: o } };
					if (o[0] == ':') obj.data.emptyNode = 123;
					return obj;
				});

				edges.forEach(function (list, fId) {
					return list.forEach(function (tId) {
						return elems.push({ data: {
								id: nodesNames[fId] + '_' + nodesNames[tId - 1],
								source: nodesNames[fId],
								target: nodesNames[tId - 1]
							} });
					});
				});

				$scope.list.push({ elems: elems, name: name, id: $scope.list.length });
				updateListCat();
				callback();
			}, function (o) {
				return console.log('err loading test.json', o);
			});
		});
	};
	// $http.get('/listResults').then(function (_ref3) {
		// var data = _ref3.data;


		// window.xxx = data;
		// // let list = data.split('<tbody id=tb>')[1].split('</tbody>')[0]
		// // 			.trim().match(/<tr>(.*)<\/tr>/g)
		// // 			.filter(s => s.indexOf('[DIRECTORY]')!=-1)
		// // 			.map(o => o.match(/<a[^\>]*>(.*?)\/?<\/a>/)[1]);
		// var list = data.match(/<a[^>]*>.*?<\/a>/g).map(function (o) {
		// 	return o.match(/>.*?(?=<)/)[0].substr(1);
		// }).filter(function (o) {
		// 	return o != '../';
		// }).map(function (o) {
		// 	return o.substr(0, o.length - 1);
		// });

		// console.log('==> ', list.slice(0));

		let list =  'big-board2-bzip2 big-board2-gzip big-board2-xz flac-bzip2 flac-gzip flac-xz jpeg-bzip2 jpeg-gzip jpeg-xz movies-reviews-bzip2 movies-reviews-gzip movies-reviews-xz mp3-bzip2 mp3-gzip mp3-xz music-bzip2 music-gzip music-xz pics-bzip2 pics-gzip pics-xz rawpics-bzip2 rawpics-gzip rawpics-xz small-bzip2 small-gzip small-xz'.split(' ');

		var next = function next() {
			var cur = list.pop();
			if (!cur) return finishLoad();
			loadThisOne(cur, next);
		};
		next();
	// }, function (err) {
	// 	return console.log("err");
	// });
});

