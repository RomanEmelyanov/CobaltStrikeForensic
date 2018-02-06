// c:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe /reference:system.management.automation.dll loader.cs

using System;
using System.IO;
using System.Text;
using System.Management.Automation.Runspaces;

class Test
{
    public static void Main()
    {
		string ps = File.ReadAllText("LEVEL2m.ps1");
		// Console.WriteLine(ps);
		Runspace runspace = RunspaceFactory.CreateRunspace();
		runspace.Open();
		Pipeline pipeline = runspace.CreatePipeline();
		pipeline.Commands.AddScript(ps);
		pipeline.Invoke();
    }
}