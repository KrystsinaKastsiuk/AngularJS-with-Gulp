(function(){
'use strict';

angular
	.module('toDoList')
	.controller('listComments', ['$scope', function($scope) {

		let currentMonth = new Date().getMonth();
		let currentDate = new Date().getDate();
		let currentFullYear = new Date().getFullYear();

		$scope.shortDate = currentDate + "." + currentMonth + "." + currentFullYear;

		$scope.hideButtonAdd = true;
		$scope.hideButtonSave = false;
		$scope.hideButtonRemove = true;
		$scope.hideButtonShow = false;

		let listComments = [
			{'name': 'Olha',	'comment': 'Good job',	'createDate': '25.12.2016',	'changeDate': '04.05.2016', 'done': false},
			{'name': 'Petya',	'comment': 'It is not correct, please redone',	'createDate': '23.02.2015',	'changeDate': '17.01.2016', 'done': false},
			{'name': 'Iryna',	'comment': 'There is one mistake',	'createDate': '29.09.2016',	'changeDate': '01.09.2016', 'done': false}
		];

		$scope.comments = listComments;

		$scope.addComment = () => {
			$scope.comments.push({'name': $scope.newUser,	'comment': $scope.newComment,	'createDate': $scope.shortDate,	'changeDate': '15.11.2018', 'done': false});
			$scope.newUser = "";
			$scope.newComment = "";
		}

		$scope.saveComment = () => {
			for (let i = 0; i < $scope.comments.length; i++) {
				if ($scope.comments[i].name === $scope.newUser) {
					$scope.comments[i].name = $scope.newUser;
					$scope.comments[i].comment = $scope.newComment;
					break;
				}
			}
			$scope.newUser = "";
			$scope.newComment = "";
		}

		$scope.editComment = (user, comment) => {
			$scope.newUser = user;
			$scope.newComment = comment;

			$scope.hideButtonAdd = false;
			$scope.hideButtonSave = true;
		}

		$scope.deleteComment = comment =>	$scope.comments.splice($scope.comments.indexOf(comment), 1);

		$scope.deleteComments = () => {
			$scope.comments = listComments.filter( comment => !comment.done );
		}

		$scope.showComments = () => {
			$scope.comments = listComments.filter( comment => !comment.done );
			$scope.hideButtonRemove = true;
			$scope.hideButtonShow = false;
		}

		$scope.archived = () => {
			$scope.comments = listComments.filter( comment => comment.done );
			$scope.hideButtonRemove = false;
			$scope.hideButtonShow = true;
		}
	}])
})();
