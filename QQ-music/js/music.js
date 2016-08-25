window.onload=function()
{
	var oList=document.getElementById("imusic-box");
	var aLi=oList.getElementsByTagName("li");
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function()
		{
			this.className="show";
		};
		aLi[i].onmouseout=function()
		{
			this.className="";
		};
	}
};
