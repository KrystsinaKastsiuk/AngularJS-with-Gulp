(function(){
'use strict';

angular
	.module('toDoList')
	.controller('listComments', ['$scope', function($scope) {

		$scope.hideButtonAdd = true;
		$scope.hideButtonSave = false;
		$scope.hideButtonRemove = true;
		$scope.hideButtonShow = false;

		let listComments = [
			{'id': '1', 'name': 'Olha',	'comment': 'Good job',	'createDate': '25.12.2016',	'changeDate': '04.05.2016', 'done': false},
			{'id': '2', 'name': 'Petya',	'comment': 'It is not correct, please redone',	'createDate': '23.02.2015',	'changeDate': '17.01.2016', 'done': false},
			{'id': '3', 'name': 'Iryna',	'comment': 'There is one mistake',	'createDate': '29.09.2016',	'changeDate': '01.09.2016', 'done': false}
		];
    
    // Initial data
		if (!localStorage.getItem('listComments')) localStorage.setItem('listComments', JSON.stringify(listComments));
		
		$scope.comments = JSON.parse(localStorage.getItem('listComments')).slice();

		$scope.addComment = () => {
      let shortDate = new Date().toLocaleDateString('ru-RU');

			$scope.comments.push({
        'id': String(Number(listComments[listComments.length - 1].id)+1),
				'name': $scope.tempComment.name,
				'comment': $scope.tempComment.comment,
				'createDate': shortDate,
				'changeDate': shortDate,
				'done': false
      });

      localStorage.setItem('listComments', JSON.stringify($scope.comments));
			$scope.tempComment.name = "";
			$scope.tempComment.comment = "";
		}

		$scope.saveComment = () => {
			for (let i = 0; i < $scope.comments.length; i++) {
				if ($scope.comments[i].id === $scope.tempComment.id) {
					$scope.comments[i].name = $scope.tempComment.name;
					$scope.comments[i].comment = $scope.tempComment.comment;
					$scope.comments[i].changeDate = new Date().toLocaleDateString('ru-RU');
					localStorage.setItem('listComments', JSON.stringify($scope.comments));
					break;
				}
			}

			$scope.hideButtonAdd = true;
			$scope.hideButtonSave = false;
			
			$scope.tempComment.name = "";
			$scope.tempComment.comment = "";
		}

		$scope.editComment = (comment) => {
			$scope.tempComment = comment;

			$scope.hideButtonAdd = false;
			$scope.hideButtonSave = true;
		}

		$scope.deleteComment = comment =>	{
			$scope.comments[$scope.comments.indexOf(comment)].done = true;			
			$scope.comments = listComments.filter( comment => !comment.done );
		}

		$scope.deleteComments = () => {
      $scope.comments = listComments.filter( comment => !comment.done );
      localStorage.setItem('listComments', JSON.stringify($scope.comments));
    }

		$scope.showComments = () => {
      $scope.comments = listComments.filter( comment => !comment.done );
      localStorage.setItem('listComments', JSON.stringify($scope.comments));
			$scope.hideButtonRemove = true;
			$scope.hideButtonShow = false;
		}

		$scope.archived = () => {
      localStorage.setItem('listComments', JSON.stringify($scope.comments));
			$scope.comments = listComments.filter( comment => comment.done );
			$scope.hideButtonRemove = false;
			$scope.hideButtonShow = true;
		}
	}])
})();
