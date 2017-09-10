define(['jquery'],function($){
	this.loadFile = function(path,append,id,type){
		type =  type|| 'style';
		$.get(path,function(data){
			var action = append?'append':'prepend';
			var style =  data.replace(/\.\.\//g,"");
			var content = '<'+type+' id='+id+'>';
				content +=  style;
				content += '</'+type+'>';
			$('body')[action](content);
		});
	}
	return this;
});