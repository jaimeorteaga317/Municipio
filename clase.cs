using ePagos.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Services;

namespace ePagos
{
    public partial class PagosyAdeudos : System.Web.UI.Page
    {
        private const string Comillas = "\"";
        private static string usuario = string.Empty;
        private static string password = string.Empty;
        public resultSima resultSima = new resultSima();
        protected void Page_Load(object sender, EventArgs e)
        {
            string respuesta = string.Empty;
            string estatus = string.Empty;
            string ipaAgs = string.Empty;
            if ((!usuario.Equals("")) && (!password.Equals("")))
            {
                respuesta = Login(usuario, password);
                estatus = obtieneValorJsonStandard("status", "", respuesta);
                ipaAgs = obtieneValorJsonStandard("ipaAgs", "", respuesta);

                switch (estatus)
                {
                    case "0":
                        Response.Redirect("Error.aspx?");
                        break;
                    case "1":
                        string dato1 = ipaAgs.ToString();
                        ObtencionTes(dato1);
                        /*obtiene informacion de usuario ipasgs*/
                        /*y obtioene infoprmacion de webservice multipagos para mostrar*/
                        break;
                    case "2":
                        Response.Redirect("Error.aspx");
                        break;
                    case "3":
                        Response.Redirect("Error.aspx");
                        break;
                    case "4":
                        Response.Redirect("Error.aspx");
                        break;                    
                    default:
                        Console.WriteLine("Default case");
                        break;
                }
            }
            else
            {
                Response.Redirect("Error.aspx");
            }
        }

        private string obtieneValorJsonStandard(string llave, string token, string jsonText)
        {
            string respuesta = string.Empty;
            JArray Json_ = JArray.Parse("[" + jsonText + "]");
            foreach (JObject jsonAll in Json_.Children<JObject>())
            {
                if (jsonAll.ContainsKey(llave))
                {
                    if (jsonAll[llave].Count() > 0)
                    {
                        if (jsonAll[llave][token] != null) { respuesta = jsonAll[llave][token].ToString(); break; }
                    }
                    else
                    {
                        respuesta = jsonAll[llave].ToString();
                        break;
                    }
                }
            }
            return respuesta;
        }

        [WebMethod]
        public static void LoginVerificacion(string parametro1, string parametro2)
        {
            usuario = string.Empty;
            password = string.Empty;

            usuario = parametro1;
            password = parametro2;

        }

        public static string Login(string param1, string param2)
        {
            var url = "http://131.107.0.207/Sistemas/wsCAM/api/LoginCiudadano?usuario=" + param1 + "&password=" + param2 + "&wsusuario=SimaUserWS&wsPassword=C3a1m7U7s2";
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "application/json";
            request.Accept = "application/json";
            string response = string.Empty;
            try
            {
                using (WebResponse response1 = request.GetResponse())
                {
                    using (Stream strReader = response1.GetResponseStream())
                    {
                        if (strReader == null) { return string.Empty; }
                        using (StreamReader objReader = new StreamReader(strReader))
                        {
                            response = objReader.ReadToEnd();
                            // Do something with responseBody                            
                            //Console.WriteLine(resultSima);

                        }
                    }
                }
            }
            catch (WebException ex)
            {
                response = ex.ToString();
                // Handle error
            }

            return response;
        }
        private void ObtencionTes(string dato1)
        {
            var url = "http://131.107.0.207/Sistemas/wsCAM/api/ConsultaCiudadano?tipoConsulta=1&dato1=" + dato1 + "&dato2=&dato3=&wsusuario=SimaUserWS&wsPassword=C3a1m7U7s2";
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.ContentType = "application/json";
            request.Accept = "application/json";

            try
            {
                using (WebResponse response1 = request.GetResponse())
                {
                    using (Stream strReader = response1.GetResponseStream())
                    {
                        if (strReader == null) { return; }
                        using (StreamReader objReader = new StreamReader(strReader))
                        {
                            string response = objReader.ReadToEnd();
                            // Do something with responseBody
                            resultSima = JsonConvert.DeserializeObject<resultSima>(response);
                            //var response = resultSima;
                            //return response;
                        }
                    }
                }
            }
            catch (WebException ex)
            {
                return;
                // Handle error
            }
        }
    }
}
