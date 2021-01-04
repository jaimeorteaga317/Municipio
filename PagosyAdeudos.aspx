<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteePagos.Master" CodeBehind="PagosyAdeudos.aspx.cs" Inherits="ePagos.PagosyAdeudos" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContenedorPrincipal" runat="server">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-red.css">
    <section class="uk-section uk-section-muted">

        <%--#BEGIN REGION - INFORMACIÓN ENCABEZADO DE PAGOS Y ADEUDOS IPAAGS--%>
        <% 
            if (resultSima.Result == 1)
            {
                var comillas = "\"";
                //Obj Ciudadano
                foreach (var ciudadano in resultSima.SIMACiudadanos)
                {
                    Response.Write("<div class=" + comillas + "uk-container uk-container-expand" + comillas + " >");
                    Response.Write("<div class=" + comillas + "uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " + comillas + " style=" + comillas + "background-color:transparent" + comillas + "uk-grid>");
                    Response.Write("<div class=" + comillas + "uk-card uk-card-default uk-card-body uk-border-rounded div1" + comillas + " style=" + comillas + "background-color:transparent" + comillas + ">");

                    Response.Write("<h2 class=" + comillas + "w3-center123" + comillas + ">PAGOS Y ADEUDOS</h2>");
                    Response.Write("<table class=" + comillas + "uk-table" + comillas + " >");
                    Response.Write("<thead></thead>");
                    Response.Write("<tbody>");

                    Response.Write("<tr>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">Nombre</th>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.nombre +  " " + ciudadano.Apellido_Paterno + " " + ciudadano.Apellido_Materno + "</th>");
                    Response.Write("<tr>");

                    Response.Write("<tr>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">RFC</th>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.RFC + "</th>");
                    Response.Write("<tr>");

                    Response.Write("<tr>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">IpaAgs</th>");
                    Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style=" + comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.IpaAgs + "</th>");
                    Response.Write("<tr>");

                    Response.Write("</tbody>");
                    Response.Write("</table>");
                    Response.Write("</div>");
                    Response.Write("</div>");
                    Response.Write("</div>");
                    //Response.Write("<div>" + "<strong>" + "Nombre de usuario: " + "</strong>" + ciudadano.nombre + " " + ciudadano.Apellido_Paterno + " " + ciudadano.Apellido_Materno + "</div>");
                }
            }
        %>

        <%--#END REGION - INFORMACION DE PAGOS Y ADEUDOS IPAAGS--%>

        <%--//Tabla Expander--%>
        <div class="uk-container uk-container-expand">
            <div class="uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " style="background-color: transparent" uk-grid>
                <div class="uk-card uk-card-default uk-card-body uk-border-rounded div1" style="background-color: transparent">
                    <%--<h2 class="w3-center123">Lista de opciones</h2>--%>
                    <button onclick="myAccFunc('Demo1')" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Adeudos</button>
                    <div id="Demo1" class="w3-hide">
<%--                        <div class="w3-container">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>--%>
                         <% 
                                if (resultSima.Result == 1)
                                {
                                    var comillas = "\"";
                                    //Obj Ciudadano
                                    foreach (var ciudadano in resultSima.SIMACiudadanos)
                                    {
                                        Response.Write("<table class=" + comillas + "table table-hover" + comillas + " >");
                                        Response.Write("<thead>");
                                        Response.Write("<tr>");

                                        Response.Write("<th>Obl</th>");
                                        Response.Write("<th>Apl</th>");
                                        Response.Write("<th>Cuenta principal</th>");
                                        Response.Write("<th>Cuenta secundaria</th>");
                                        Response.Write("<th>Propietario</th>");
                                        Response.Write("<th>Total adeudo</th>");
                                        Response.Write("<th>Req</th>");
                                        Response.Write("<th>Convenio</th>");
                                        Response.Write("<th>Devolucion</th>");
                                        Response.Write("<th>Adeudos no sumados al total adeudo</th>");
                                        Response.Write("<th>Opciones</th>");

                                        Response.Write("</tr>");
                                        Response.Write("</thead>");
                                        Response.Write("<tbody>");

                                        Response.Write("<tr>");
                                        Response.Write("<td>" + ciudadano.nombre + "</td>");
                                        Response.Write("<td>" + ciudadano.RFC + "</td>");
                                        Response.Write("<td>" + ciudadano.IpaAgs + "</td>");
                                        Response.Write("<td>" + ciudadano.correo_electronico + "</td>");
                                        Response.Write("<td>" + ciudadano.estado + "</td>");
                                        Response.Write("<td>" + ciudadano.municipio + "</td>");
                                        Response.Write("<td>" + ciudadano.localidad + "</td>");
                                        Response.Write("<td>" + ciudadano.fraccionamiento + "</td>");
                                        Response.Write("<td>" + ciudadano.telefono + "</td>");
                                        Response.Write("<td>" + ciudadano.IpaAgs + "</td>");

                                        Response.Write("<td>");
                                        Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "facturar" + comillas + "  onclick=" + comillas + "javascript:Alert('"+ciudadano.IpaAgs+"');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/search.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">  Ir a estado de cuenta </button>");
                                        //Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "facturar" + comillas + "  onclick=" + comillas + "javascript:Alert('"+ciudadano.RFC+"');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/search.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">  Facturar </button>");
                                        //Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "imprimir" + comillas + "  onclick=" + comillas + "javascript:Alert('imprimir');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/imprimir.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">  Imprimir </button>");
                                        Response.Write("</td>");

                                        Response.Write("<tr>");

                                        Response.Write("</tbody>");
                                        Response.Write("</table>");
                                    }
                                }
                        %>

                    </div>
                    <button onclick="myAccFunc('Demo2')" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Pagos</button>
                    <div id="Demo2" class="w3-hide">
<%--                        <div class="w3-container">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>--%>
                        <% 
                            if (resultSima.Result == 1)
                            {
                                var comillas = "\"";
                                //Obj Ciudadano
                                foreach (var ciudadano in resultSima.SIMACiudadanos)
                                {
                                    Response.Write("<table class=" + comillas + "table table-hover" + comillas + " >");
                                    Response.Write("<thead>");
                                    Response.Write("<tr>");

                                    Response.Write("<th>Obl</th>");
                                    Response.Write("<th>Apl</th>");
                                    Response.Write("<th>Cuenta principal</th>");
                                    Response.Write("<th>Cuenta secundaria</th>");
                                    Response.Write("<th>Fecha de pago</th>");
                                    Response.Write("<th>Propietario</th>");
                                    Response.Write("<th>Recibo</th>");
                                    Response.Write("<th>Estado</th>");
                                    Response.Write("<th>Importe pagado</th>");
                                    Response.Write("<th>Opciones</th>");

                                    Response.Write("</tr>");
                                    Response.Write("</thead>");
                                    Response.Write("<tbody>");

                                    Response.Write("<tr>");
                                    Response.Write("<td>" + ciudadano.nombre + "</td>");
                                    Response.Write("<td>" + ciudadano.RFC + "</td>");
                                    Response.Write("<td>" + ciudadano.IpaAgs + "</td>");
                                    Response.Write("<td>" + ciudadano.Apellido_Paterno + "</td>");
                                    Response.Write("<td>" + ciudadano.Apellido_Materno + "</td>");
                                    Response.Write("<td>" + ciudadano.fraccionamiento + "</td>");
                                    Response.Write("<td>" + ciudadano.calle + "</td>");
                                    Response.Write("<td>" + ciudadano.estado + "</td>");
                                    Response.Write("<td>" + ciudadano.telefono + "</td>");

                                    Response.Write("<td>");
                                    Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "facturar" + comillas + "  onclick=" + comillas + "javascript:Alert('" + ciudadano.IpaAgs + "');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/search.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">Facturar</button>");
                                    Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "imprimir" + comillas + "  onclick=" + comillas + "javascript:Alert('imprimir');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/imprimir.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">Imprimir</button>");
                                    Response.Write("</td>");

                                    Response.Write("<tr>");

                                    Response.Write("</tbody>");
                                    Response.Write("</table>");
                                }
                            }
                        %>

                    </div>


                    <%--Devoluciones--%>
                    <button onclick="myAccFunc('Demo3');" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Devoluciones</button>

                    <div id="Demo3" class="w3-hide">
<%--                        <div class="w3-container">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>--%>
                        <div style="overflow-x: auto;">
                            <% 
                                if (resultSima.Result == 1)
                                {
                                    var comillas = "\"";
                                    //Obj Ciudadano
                                    foreach (var ciudadano in resultSima.SIMACiudadanos)
                                    {
                                        Response.Write("<table class=" + comillas + "table table-hover" + comillas + " >");
                                        Response.Write("<thead>");
                                        Response.Write("<tr>");

                                        Response.Write("<th>Folio</th>");
                                        Response.Write("<th>Obl</th>");
                                        Response.Write("<th>Apl</th>");
                                        Response.Write("<th>Cuenta principal</th>");
                                        Response.Write("<th>Cuenta secundaria</th>");
                                        Response.Write("<th>Recibo de pago</th>");
                                        Response.Write("<th>Importe solicitado</th>");
                                        Response.Write("<th>Dictamen</th>");
                                        Response.Write("<th>Importe otros adeudos</th>");
                                        Response.Write("<th>Pagado con</th>");
                                        Response.Write("<th>Importe devolver</th>");
                                        //Response.Write("<th>Opciones</th>");

                                        Response.Write("</tr>");
                                        Response.Write("</thead>");
                                        Response.Write("<tbody>");

                                        Response.Write("<tr>");
                                        Response.Write("<td>" + ciudadano.IpaAgs + "</td>");
                                        Response.Write("<td>" + ciudadano.nombre + "</td>");
                                        Response.Write("<td>" + ciudadano.Apellido_Paterno + "</td>");
                                        Response.Write("<td>" + ciudadano.Apellido_Materno + "</td>");
                                        Response.Write("<td>" + ciudadano.RFC + "</td>");
                                        Response.Write("<td>" + ciudadano.correo_electronico + "</td>");
                                        Response.Write("<td>" + ciudadano.estado + "</td>");
                                        Response.Write("<td>" + ciudadano.municipio + "</td>");
                                        Response.Write("<td>" + ciudadano.localidad + "</td>");
                                        Response.Write("<td>" + ciudadano.numero_exterior + "</td>");
                                        Response.Write("<td>" + ciudadano.telefono + "</td>");

                                        //Response.Write("<td>");
                                        //Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "facturar" + comillas + "  onclick=" + comillas + "javascript:Alert('"+ciudadano.IpaAgs+"');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/search.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">  Facturar </button>");
                                        //Response.Write("<button type=" + comillas + "button" + "id=" + comillas + "imprimir" + comillas + "  onclick=" + comillas + "javascript:Alert('imprimir');" + comillas + " style=" + comillas + "background-color:#3B77E0; margin: 10px; float: right;" + comillas + ">" + "<img src=" + comillas + "assets/img/imprimir.png" + comillas + " class=" + comillas + "img-fluid" + comillas + " alt=" + comillas + "Responsive image" + comillas + ">  Imprimir </button>");
                                        //Response.Write("</td>");

                                        Response.Write("<tr>");

                                        Response.Write("</tbody>");
                                        Response.Write("</table>");
                                    }
                                }
                            %>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        <%--//Fin Tabla Expander--%>

        <%--//Funcion caduca sesion --%>
        <script type="text/javascript">
            function e(q) {
                document.body.appendChild(document.createTextNode(q));
                document.body.appendChild(document.createElement("BR"));
            }
            function inactividad() {
                e("Inactivo!!");
                //alert("Sesion caducada");
                alertSesion();
                //window.location.href = "Inicio.aspx";
            }
            var t = null;
            function contadorInactividad() {
                t = setTimeout("inactividad()", 3000);
            }
            window.onblur = window.onmousemove = function () {
                if (t) clearTimeout(t);
                contadorInactividad();
            }
        </script>
    </section>

    <style>
        th1 {
            padding-bottom: 4px;
            padding-top: 4px;
            background-color: #77D0E3;
            text-align: right
        }

        th2 {
            padding-bottom: 4px;
            padding-top: 4px;
        }
        /*//Tabla*/
        table {
            border-collapse: collapse !important;
            border-spacing: 0;
            border: 1px solid #ddd;
            width: 100%;
            max-width: 100%;
            /*background-color:transparent;*/
            margin-bottom: 20px;
            text-align: center;
            background-color: #fff;
            /*margin-bottom:0;*/
        }

        .table-hover > tbody > tr:hover {
            background-color: #77D0E3
        }
        /*.table-hover>tbody>tr>td:hover{background-color:black}*/

        th, td {
            text-align: center;
            padding: 8px;
            color: black;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2
        }

        w3-padding-16 {
            padding-top: 16px !important;
            padding-bottom: 16px !important
        }

        w3-theme {
            color: #fff !important;
            background-color: greenyellow !important
        }

        w3-button:hover {
            color: #000 !important;
            background-color: #ccc !important
        }

        w3-block {
            display: block;
            width: 100%
        }

        w3-left-align {
            text-align: left !important
        }

        w3-hide {
            display: none !important
        }

        w3-center123 {
            text-align: center !important
        }
        /*w3-container:after,.w3-container:before*/
        /*w3-container:after,.w3-container:before*/
        /*w3-container:after,.w3-container:before*/
        /*w3-container:after,.w3-container:before*/


        .w3-theme {
            color: #fff !important;
            background-color: dodgerblue !important
        }

        .w3-hover-theme:hover {
            color: #fff !important;
            background-color: #f44336 !important
        }

        .w3-hover-text-theme:hover {
            color: #f44336 !important
        }

        .w3-hover-border-theme:hover {
            border-color: #f44336 !important
        }
        /*.swal-overlay {
            background-color: rgba(43, 165, 137, 0.45);
        }*/
    </style>
</asp:Content>
