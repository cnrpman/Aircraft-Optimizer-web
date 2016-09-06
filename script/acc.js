var jsonSerialArr=new Array();
var ajaxFlag={};
var ajaxTxt={};

var p_map={};
var cv_map={};

var cv_len=0,cv_lim=3;
var p_len=0,p_lim=19;

var force_add_flag_cv=0;
var force_add_flag_p=0;

var jsonObj={};
var jstr="";

var picN = 7;
var cookiename="submitlog";

function randpic(){
	var ranNum = Math.floor(Math.random()*picN);
	document.getElementById("summary").className += ' bgpic'+ ranNum;
	document.getElementById("footer").className += ' bgpic'+ ranNum;
	document.getElementById("submitbtn").className += ' bgcolor'+ ranNum;
	document.getElementById("littleblock").className += ' bgcolor'+ ranNum;
	document.getElementById("topbar").className += ' bgcolor'+ ranNum;

	var author =[
		'Spark',
		'わだつみ◎ｺﾐ1 あ66a',
		'Nine',
		'Nine',
		'りいちゅ@サンクリA-18b',
		'つーはん_1日目東Ｈ36a',
		'わだつみ◎ｺﾐ1 あ66a'
	],
	url = [
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=39947979",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=43133531",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=45464867",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=45504459",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=45781130",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=46146245",
		"http://www.pixiv.net/member_illust.php?mode=medium&illust_id=47512397"
	];
	document.getElementById("footer_url").href = url[ranNum];
	var inside = document.getElementById("footer_name").innerHTML;
	var all_links = "";
	for(var i = 0; i < picN; i++){
		all_links += '<a href="' + url[i] + '" target="_blank">' + (i+1) + '</a>'
	}
	document.getElementById("footer_name").innerHTML = inside.replace('author_area',author[ranNum]) + all_links;
}

function oonch(obj){
	var reg = new RegExp("^[0-9]*$");
	if(!reg.test(obj.value)){
		obj.value="0";
		return;
	}
	else if(obj.value==""||obj.value<0)
		obj.value="0";
	else if(obj.value>999)
		obj.value="999";
	obj.value=Number(obj.value);
}

function oonclick(obj){
	obj.value="";
}

function oonblur(obj){
	if(obj.value=="")
		obj.value="0";
}

function pnonch(obj){
	var reg = new RegExp("^[0-9]*$");
	if(!reg.test(obj.value)){
		obj.value="1";
		return;
	}
	else if(obj.value==""||obj.value<=0)
		obj.value="1";
	else if(obj.value>99)
		obj.value="99";
	obj.value=Number(obj.value);
}

function pnonclick(obj){
	obj.value="";
}

function pnonblur(obj){
	if(obj.value=="")
		obj.value="1";
}

var jsonSerialArrInit =function (){
	var tot=0;
	jsonSerialArr[tot++]="ad";
	jsonSerialArr[tot++]="op";
	jsonSerialArr[tot++]="accu";
	jsonSerialArr[tot++]="las";
	jsonSerialArr[tot++]="armor";
	for(var i=0;i<4;i++){
		jsonSerialArr[tot++]="cv"+i;
		for(var j=0;j<4;j++){
			jsonSerialArr[tot++]="cv"+i+"box"+j;
		}
		jsonSerialArr[tot++]="ifo"+i;
	}
	for(var i=0;i<20;i++){
		jsonSerialArr[tot++]="plane"+i;
		jsonSerialArr[tot++]="plane"+i+"num";
	}
	jsonSerialArr[tot++]="ncoef";
}

function getJsonFromCookies(){
	var ctxt=getCookie(cookiename);
	if(ctxt!="")jsonObj=JSON.parse(ctxt);
	console.log(jsonObj);
}
function jsonCreateNSave(){
	var item;
	for(var i=0;item=jsonSerialArr[i];i++){
		var nameEle=document.getElementsByName(item)[0]
		if(nameEle === undefined){
			jsonObj[item]=undefined;
			continue;
		}
		if(item.match("box")||item.match("ifo"))
			jsonObj[item]=nameEle.checked;
		else
			jsonObj[item]=nameEle.value;
	}
	jstr=JSON.stringify(jsonObj);

	setCookie(cookiename,jstr,30);

}
function jsonUnNorm(){
	var item;
	for(var i=0;item=jsonSerialArr[i];i++){
		var element=jsonObj[item];
		if(element === undefined)continue;
		var tarNode=document.getElementsByName(item)[0];
		if(item.match("box")||item.match("ifo")||item.match("cv")||item.match("plane"))continue;
		tarNode.value=element;
	}
}

function jsonUnCv(){
	var item;
	for(var i=0;item=jsonSerialArr[i];i++){
		if(item.match("ifo")==null&&item.match("cv")==null)continue;
		var element=jsonObj[item];
		if(element === undefined)continue;
		var tarNode=document.getElementsByName(item)[0];
		if(tarNode==null)continue;
		//if(tarNode==null)continue;
		if(item.match("ifo")||item.match("box"))
			tarNode.checked=element;
		else{
			tarNode.value=element;
			cv_changed(tarNode);
		}
	}
}

function jsonUnP(){
	var item;
	for(var i=0;item=jsonSerialArr[i];i++){
		var element=jsonObj[item];
		if(item.match("plane")==null)continue;
		if(element === undefined)continue;
		var tarNode=document.getElementsByName(item)[0];
		if(tarNode==null)continue;
		tarNode.value=element;
		if(!item.match("num$"))p_changed(tarNode);
	}
}

function setCookie(cname,cvalue,exdays){
var d = new Date();
d.setTime(d.getTime()+(exdays*86400000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/; domain=rpman.net';
}
function getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}

var setResA = function(innerStr, callback){
	$("#resultArea").slideUp("fast",function(){
		$(this).css("display","none")
	           .html(innerStr)
			   .slideDown("fast");
	    if(typeof callback === "function")
		    callback();	
	});
}

function submitFunc(){
	jsonCreateNSave();
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		var htmlstr = "";
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var response = JSON.parse(xmlhttp.responseText);

			//result title..
			if(response.stderr.match("Killed")){
				htmlstr += message.intererror;
				setResA(htmlstr);
				return;
			}
			var resarr = response.stdout.split('\n');
			if(resarr[0].match("ERROR")){
				if(resarr[0].match("FighterPower unreachable"))
					htmlstr += message.unreachable;
				else if(resarr[0].match("ERROR:TLE"))
					htmlstr += message.TLE;
				else if(resarr[0].match("Too much bomber"))
					htmlstr += message.toomuch;
			}
			else{
				htmlstr += message.success;
			}
			//result first line
			htmlstr += "<b>Return:</b>"+ resarr[0] + '\n'
			         + '<a data-toggle="collapse" data-target="#hiquery" href="javascript:void(0)"><i>Show Query..</i></a>\n'
			         + '<div id="hiquery" class="collapse"><div class="panel panel-default"><div class="panel-body">'+"<b>Query:</b>"+response.query+'</div></div></div>\n';
			
			//result table..
			if(resarr[0].match("ERROR")){
			 	setResA(htmlstr);
				return;
			}
			htmlstr += "<table class=\"table table-bordered\">\n"
					 + '<thead><tr><th></th><th class="middler">装备1</th><th class="middler">装备2</th><th class="middler">装备3</th><th class="middler">装备4</th><th class="middler">同航火力</th><th class="middler">反航火力</th></tr></thead>\n'
			         + "<tbody>";
			for(var i = 0; response.cvs[i]; i++){
				var rowarr = (resarr[i+1]).split('|');
				var rowatt = (resarr[i+7]).split('|');
				htmlstr += "<tr>\n"
				         + '<th class="middler">' + cv_map[response.cvs[i]].name_cn + '</th>';
				for(var j = 0; j < 4; j++){
					htmlstr += '<td class="p_Opt_' + p_map[rowarr[j]].className + '" ><div'
					if(rowatt[j] != ' - ')
						htmlstr += ' data-toggle="tooltip" data-placement="left" title="开幕攻击力 [' + rowatt[j] + ']" ';
					htmlstr+='>' + '(' + cv_map[response.cvs[i]].grid[j] + ') ' + p_map[rowarr[j]].name_cn + '</div></td>';
				}
				htmlstr += '<td class="middler">' + rowatt[4] + '</td>' + '<td class="middler">' + rowatt[5] + '</td>'
				         + '</tr>'
			}
			htmlstr += "</tbody>\n"
			         + "</table>\n";

			setResA(htmlstr,function(){
				$('[data-toggle="tooltip"]').tooltip();
			});
			return;
		}
		if(xmlhttp.readyState==4 && xmlhttp.status!=200){
			htmlstr += message.ret404;
			setResA(htmlstr);
			return;
		}
	}
	xmlhttp.open("POST","req/acc/ret",true);
	xmlhttp.send(jstr);
	setResA('<br><br>'+message.send+"<br><hr>");;
}

var delete_cv = function(){
	if(cv_len>0){
		if(document.getElementById("cv_sel"+cv_len).value=="null"&&document.getElementById("cv_sel"+(cv_len-1)).value=="null"){
			console.log("cv_deleting from"+cv_len);
			var tdiv=document.getElementById("cv_div"+cv_len);
			$('#'+tdiv.id).slideUp("fast",function(){
				console.log('invoke');
				$(this).remove();
				cv_len--;
				delflag=1;
				delete_cv();
			});
		}
	}
}

function cv_changed(obj){
	var delflag=0;
	if((obj.value!="null"||force_add_flag_cv)&&obj.id.match("cv_sel"+cv_len)&&cv_len<cv_lim){
		console.log("cv_appending from"+cv_len);
		cv_len++;
		var newElement = document.createElement('div');
		newElement.id="cv_div"+cv_len;
		//newElement.className="input-group";
		newElement.style.display="none";
		newElement.innerHTML = '<div class="input-group"><select name = "cv'+cv_len+'" id="cv_sel'+cv_len+'" class="form-control" onchange="cv_changed(this)"></select>\n'+
		'<span class=\"input-group-addon\">\n'+
			'<div style="color:DarkGray">\n'+
				'<input type="checkbox" id="cv'+cv_len+'box0" name="cv'+cv_len+'box0" disabled="true"/>\n'+
				'<input type="checkbox" id="cv'+cv_len+'box1" name="cv'+cv_len+'box1" disabled="true"/>\n'+
				'<input type="checkbox" id="cv'+cv_len+'box2" name="cv'+cv_len+'box2" disabled="true"/>\n'+
				'<input type="checkbox" id="cv'+cv_len+'box3" name="cv'+cv_len+'box3" disabled="true"/>\n'+
				'│\n'+
				'<input type="checkbox" id="ifo'+cv_len+'" name="ifo'+cv_len+'" disabled="true"/>\n'+
			'</div>\n'+
		'</span></div>';

		document.getElementById("cv_form").appendChild(newElement);
		getCvOp("cv_sel"+cv_len);
		
		$('#'+newElement.id).slideDown("fast");
	}
	else if(obj.value=="null"){
		delete_cv();
	}
	//disable
	if(document.getElementById(obj.id)==null) return;
	var cv_cur=obj.id.replace("cv_sel","");
	//console.log(cv_cur);
	if(obj.value=="null"){
		document.getElementById("ifo"+cv_cur).disabled="true";
		document.getElementById("ifo"+cv_cur).checked=false;
	}
	else
		document.getElementById("ifo"+cv_cur).disabled=false;
	for(var i=0;i<cv_map[obj.value].gridSz;i++){
		var tarbox=document.getElementById("cv"+cv_cur+"box"+i);
		tarbox.disabled=false;
		tarbox.checked=true;
	}
	for(var i=cv_map[obj.value].gridSz;i<4;i++){
		var tarbox=document.getElementById("cv"+cv_cur+"box"+i);
		tarbox.disabled="true";
		tarbox.checked=false;
	}
	//ch color
	var ele = document.getElementById("cv_optId_"+obj.value);
	obj.style.backgroundColor=document.defaultView.getComputedStyle(ele,":unsel").backgroundColor;
}

var delete_p = function(){
	if(p_len>0){
		if(document.getElementById("p_sel"+p_len).value=="null"&&document.getElementById("p_sel"+(p_len-1)).value=="null"){
			console.log("p_deleting from"+p_len);
			var tdiv=document.getElementById("p_div"+p_len);
			$('#'+tdiv.id).slideUp("fast",function(){
				$(this).remove();
				p_len--;
				
				delete_p();
			});
		}
	}
}

function p_changed(obj){
	if((obj.value!="null"||force_add_flag_p)&&obj.id.match("p_sel"+p_len)&&p_len<p_lim){
		console.log("p_appending from"+p_len);
		p_len++;
		var newElement = document.createElement('div');
		newElement.id="p_div"+p_len;
		newElement.className="row";
		newElement.style.display="none";
		newElement.innerHTML = '<div class=\"col-xs-7 col-md-8\">\n'+
		'<select name = "plane'+p_len+'" id="p_sel'+p_len+'" class="form-control" onchange="p_changed(this)"></select>\n'+
		'</div>\n'+
		'<div class="col-xs-5 col-md-4">\n'+
			'<div class="input-group input-group">\n'+
				'<span class="input-group-addon"  style="color:DarkGray"> x </span>\n'+
				'<input type="text" class="form-control" size="2" id="plane'+p_len+'num" name="plane'+p_len+'num" disabled="true" onclick="pnonclick(this)" onblur="pnonblur(this)" onchange="pnonch(this)"/>\n'+
			'</div>\n'+
		'</div>\n';
		document.getElementById("p_form").appendChild(newElement);
		getPOp("p_sel"+p_len);
		
		$('#'+newElement.id).slideDown("fast");
	}
	else if(obj.value=="null"){
		delete_p();
	}
	if(document.getElementById(obj.id)==null) return;
	var plane_cur=obj.id.replace("p_sel","");
	if(obj.value=="null"){
		var tarbox=document.getElementById("plane"+plane_cur+"num");
		tarbox.value="";
		tarbox.disabled="true";
	}
	else {
		var tarbox=document.getElementById("plane"+plane_cur+"num");
		tarbox.value="1";
		tarbox.disabled=false;
	}
	var ele = document.getElementById("p_optId_"+obj.value);
	obj.style.backgroundColor=document.defaultView.getComputedStyle(ele,null).backgroundColor;
}



function getCvOp(tarid){
	if(ajaxFlag["C_DAT.txt"]){
		document.getElementById(tarid).innerHTML=ajaxTxt["C_DAT.txt"];
	}
	else{
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var xmlhttp2=new XMLHttpRequest();
				xmlhttp2.onreadystatechange=function(){
					if(xmlhttp2.readyState==4 && xmlhttp2.status==200){
						var cv_arr=xmlhttp.responseText.split("\r\n");
						var cv_ch_arr=xmlhttp2.responseText.split("\r\n");
						var ops="<option value=\"null\" id= \"cv_optId_null\" class=\"cv_Opt_null\"> -- </option>";
						var newCv={};
						var newArr=new Array();
						newCv.name_en="null";
						newCv.className="cv_Opt_null";
						newCv.name_cn="--";
						newArr[0]=newArr[1]=newArr[2]=newArr[3]=0;
						newCv.grid=newArr;
						newCv.gridSz=0;
						newCv.fire=0;
						cv_map["null"]=newCv;
						for(var i=0;cv_arr[i*3];i++){
							cv_att_arr=cv_arr[i*3+1].split(" ");
							var newCv={};
							var newArr=new Array();
							newCv.name_en=cv_arr[i*3];
							newCv.className=cv_att_arr[0];
							newCv.gridSz=cv_att_arr[1];
							newArr[0]=cv_att_arr[2];
							newArr[1]=cv_att_arr[3];
							newArr[2]=cv_att_arr[4];
							newArr[3]=cv_att_arr[5];
							newCv.fire=cv_att_arr[6];
							newCv.grid=newArr;
							newCv.name_cn=cv_ch_arr[i];
							ops+='<option value="'+newCv.name_en+'"'+' id= "cv_optId_'+ newCv.name_en+'" class ="cv_Opt_'+newCv.className+'">' + newCv.name_cn+'</option>';
							
							cv_map[cv_arr[i*3]]=newCv;
							//console.log(newCv);
						}
					    ajaxTxt["C_DAT.txt"]=ops;
					    ajaxFlag["C_DAT.txt"]=1;
					    document.getElementById(tarid).innerHTML=ops;

					    getCvOp("cv_sel0");
					    force_add_flag_cv=1;
					    jsonUnCv();
					    force_add_flag_cv=0;
					    cv_changed(document.getElementById("cv_sel"+cv_len));
					}
				}
				xmlhttp2.open("GET","./dat/C_TRANS.txt",true);
				xmlhttp2.send();
			}
		}
		xmlhttp.open("GET","./dat/C_DAT.txt",true);
		xmlhttp.send();
	}
}



function getPOp(tarid){
	if(ajaxFlag["P_DAT.txt"]){
		document.getElementById(tarid).innerHTML=ajaxTxt["P_DAT.txt"];
	}
	else{
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				var xmlhttp2=new XMLHttpRequest();
				xmlhttp2.onreadystatechange=function(){
					if(xmlhttp2.readyState==4 && xmlhttp2.status==200){
						var p_arr=xmlhttp.responseText.split("\r\n");
						var p_ch_arr=xmlhttp2.responseText.split("\r\n");
						var newP={};
						var newArr=new Array();
						newP.name_en="null";
						newP.className="p_Opt_null";
						newP.name_cn="--";
						p_map["null"]=newP;
						p_map[" - "]=newP;
						var ops="<option value=\"null\" id= \"p_optId_null\" class=\"p_Opt_null\"> -- </option>";
						for(var i=0;p_arr[i*3];i++){
							p_att_arr=p_arr[i*3+1].split(" ");
							var newP={};
							newP.name_en=p_arr[i*3];
							newP.className=p_att_arr[0];
							newArr[0]=p_att_arr[1];
							newArr[1]=p_att_arr[2];
							newArr[2]=p_att_arr[3];
							newArr[3]=p_att_arr[4];
							newP.att=newArr;
							newP.name_cn=p_ch_arr[i];
							ops+='<option value="'+newP.name_en+'"'+' id= "p_optId_'+ newP.name_en+'" class ="p_Opt_'+newP.className+'">' + newP.name_cn+'</option>';
							p_map[p_arr[i*3]]=newP;
							//console.log(newP);
						}
					    ajaxTxt["P_DAT.txt"]=ops;
					    ajaxFlag["P_DAT.txt"]=1;
					    document.getElementById(tarid).innerHTML=ops;

					    getPOp("p_sel0");
					    force_add_flag_p=1;
					    jsonUnP();
					    force_add_flag_p=0;
					    p_changed(document.getElementById("p_sel"+p_len));
					}
				}
				xmlhttp2.open("GET","./dat/P_TRANS.txt",true);
				xmlhttp2.send();
			}
		}
		xmlhttp.open("GET","./dat/P_DAT.txt",true);
		xmlhttp.send();
	}
}

getJsonFromCookies();
jsonSerialArrInit();
getCvOp("ucantseeme");
getPOp("ucantseemetoo");

jsonUnNorm();
randpic();