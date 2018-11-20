(function(){
	'use strict';
	
		class listComments {
			constructor(dataService, $scope) {
				dataService.getData().then(function(response) { console.log(response) });
	
				this.hideButtonAdd = true;
				this.hideButtonSave = false;
				this.hideButtonShow = false;
				
				this.activeComment = {};
		
				this.listComments = [
					{'id': '1', 'name': 'Olha',	'comment': 'Good job',	'createDate': '25.12.2016',	'changeDate': '04.05.2016', 'done': false},
					{'id': '2', 'name': 'Petya',	'comment': 'It is not correct',	'createDate': '23.02.2015',	'changeDate': '17.01.2016', 'done': false},
					{'id': '3', 'name': 'Iryna',	'comment': 'There is one mistake',	'createDate': '29.09.2016',	'changeDate': '01.09.2016', 'done': false}
				];
				
				// Initial data
				if (!localStorage.getItem('listComments')) {
					localStorage.setItem('listComments', JSON.stringify(this.listComments));
				}
				
				$scope.comments = JSON.parse(localStorage.getItem('listComments')).slice();
				this.comments = $scope.comments;
				
				$scope.form = {};
				this.form = $scope.form;
			}
	
			addComment($scope) {
				let shortDate = new Date().toLocaleDateString('ru-RU');
					
				this.comments.push({
					'id': String(Number(this.comments[this.comments.length - 1].id)+1), // избегание, при удалении элемента, записи не на тот индекс
					'name': this.activeComment.name,
					'comment': this.activeComment.comment,
					'createDate': shortDate,
					'changeDate': shortDate,
					'done': false
				});
	
				localStorage.setItem('listComments', JSON.stringify(this.comments));
				
				this.activeComment.name = "";
				this.activeComment.comment = "";

				this.form.frm.$setUntouched();
			}

			editComment(comment) {
				this.activeComment.id = comment.id;
				this.activeComment.name = comment.name;
				this.activeComment.comment = comment.comment;
	
				this.hideButtonAdd = false;
				this.hideButtonSave = true;
			}

			saveComment() {
				this.comments.forEach( (item, i, arr) => {
					if (item.id === this.activeComment.id) {
						item.name = this.activeComment.name;
						item.comment = this.activeComment.comment;
						item.changeDate = new Date().toLocaleDateString('ru-RU');
						localStorage.setItem('listComments', JSON.stringify(this.comments));
					}
				});
	
				this.hideButtonAdd = true;
				this.hideButtonSave = false;
				
				this.activeComment.name = "";
				this.activeComment.comment = "";
				
				this.form.frm.$setUntouched();
			}

			deleteComment(comment) {
				this.comments.splice(this.comments.indexOf(comment), 1);
				localStorage.setItem('listComments', JSON.stringify(this.comments));
			}
	
			archiveComment(comment)	{
				this.comments[this.comments.indexOf(comment)].done = !this.comments[this.comments.indexOf(comment)].done;
				localStorage.setItem('listComments', JSON.stringify(this.comments));
			}
	
			showComments() {
				this.hideButtonShow = false;
			}
	
			archived() {
				this.hideButtonShow = true;
			}
			
			status(comment) {
				if ((this.ctrl.hideButtonShow == false && comment.done == false) || (this.ctrl.hideButtonShow == true && comment.done == true)) {      
					return comment;
				}
			}
	
		}
	
		listComments.$inject = ['dataService', '$scope'];
		angular.module('toDoList').controller('listComments', listComments);
	})();
	