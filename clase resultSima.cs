using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ePagos.Models
{
    public class resultSima
    {
        public int Result { get; set; }
        public string Resultado { get; set; }

        public List<SIMACiudadanos> SIMACiudadanos { get; set; }
    }
    public class SIMACiudadanos
    {
        public int IpaAgs { get; set; }
        public string nombre { get; set; }
        public string Apellido_Paterno { get; set; }
        public string Apellido_Materno { get; set; }
        public string RFC { get; set; }
        public string correo_electronico { get; set; }
        public string estado { get; set; }
        public string municipio { get; set; }
        public string localidad { get; set; }
        public string fraccionamiento { get; set; }
        public string calle { get; set; }
        public string numero_exterior { get; set; }
        public string numero_interior { get; set; }
        public string telefono { get; set; }
        public List<AplicacionesSIMA> Aplicaciones { get; set; }
    }

    public partial class AplicacionesSIMA
    {

        public string cuentaPrincipal { get; set; }

        public string cuentaSecundaria { get; set; }

        public string nombreAsociacion { get; set; }

        public string domicilio { get; set; }


        public string obligacion { get; set; }


        public string propietario { get; set; }
    }
}
