(
  function( $ )
  {
    $.style={
              insertRule:function(selector,rules,contxt)
              {
                var context=contxt||document,stylesheet;
                
                if(typeof context.styleSheets=='object')
                {
                  if(context.styleSheets.length)
                  {
                    stylesheet=context.styleSheets[context.styleSheets.length-1];
                  }
                  if(context.styleSheets.length)
                  {
                    if(context.createStyleSheet)
                    {
                      stylesheet=context.createStyleSheet();
                    }
                    else
                    {
                      context.getElementsByTagName('head')[0].appendChild(context.createElement('style'));
                      stylesheet=context.styleSheets[context.styleSheets.length-1];
                    }
                  }
                  if(stylesheet.addRule)
                  {
                    for(var i=0;i<selector.length;++i)
                    {
                      stylesheet.addRule(selector[i],rules);
                    }
                  }
                  else{
                    stylesheet.insertRule(selector.join(',') + '{' + rules + '}', stylesheet.cssRules.length);  
                  }
                }
              }
            }; 
  }
)( jQuery );



$(document).ready(
    function()
    {
        $.style.insertRule(['p','h1'],'color:red;');
        $.style.insertRule(['p'],'text-decoration:line-through;');
        $.style.insertRule(['div p'],'text-decoration:none;color:blue');
		
		//$.style.insertRule(['.padding-top-10'],'padding-top:10px');
		
		var paddingArr = [];
		var marginArr = [];
		$("[class^='padding-'], [class^='margin-']").each(function(){
			var classes = $(this).attr("class").split(" ");
			
			//loop through classes	
				$.each(classes, function(index, item){
					if(item.indexOf("padding-") != -1){
						paddingArr.push(item);
					}
					if(item.indexOf("margin-") != -1){
						marginArr.push(item);
					}
				});
		});
		//console.log(paddingArr);
		//console.log(marginArr);
		
		// fetching all padding
		$.each(paddingArr, function(key, value){
			var pValue = value.split("-");
			var p, pv;
			pv = pValue.slice(-1)[0];
			//console.log(pv);
			
			if(pValue.length > 2){
				p = pValue[0]+"-"+pValue[1];
			}
			else{
				p = pValue[0];
			}
			
			$.style.insertRule(['.'+value], p+':'+ pv +"px!important");
		});
		$.each(marginArr, function(key, value){
			var mValue = value.split("-");
			var m, mv;
			mv = mValue.slice(-1)[0];
			if(mValue.length > 2){
				m = mValue[0]+"-"+mValue[1];
			}
			else{
				m = mValue[0];
			}
			$.style.insertRule(['.'+value], m+':'+ mv +"px!important");
		});
     }
);
    