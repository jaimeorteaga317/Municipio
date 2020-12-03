<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/SiteePagos.Master" CodeBehind="PagosyAdeudos.aspx.cs" Inherits="ePagos.PagosyAdeudos" %>
<asp:Content ID="BodyContent" ContentPlaceHolderID="ContenedorPrincipal"  runat="server">    
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-red.css">
<section class="uk-section uk-section-muted">

    <%--#BEGIN REGION - INFORMACION DE PAGOS Y ADEUDOS IPAAGS--%>
                <% 
                    if (resultSima.Result == 1)
                    {
                        var comillas = "\"";
                        //Obj Ciudadano
                        foreach (var ciudadano in resultSima.SIMACiudadanos)
                        {
                            Response.Write("<div class="+ comillas +"uk-container uk-container-expand"+ comillas +" >");
                            Response.Write("<div class="+ comillas +"uk-child-width uk-grid-medium uk-grid-match uk-border-rounded "+ comillas +" style="+ comillas +"background-color:transparent" + comillas +"uk-grid>");
                            Response.Write("<div class="+ comillas +"uk-card uk-card-default uk-card-body uk-border-rounded div1"+ comillas +" style="+ comillas +"background-color:transparent"+ comillas +">");

                            Response.Write("<h2 class="+ comillas +"w3-center123"+ comillas +">ESTADO DE CUENTA</h2>");
                            Response.Write("<table class=" + comillas + "uk-table" + comillas + " >");
                            Response.Write("<thead></thead>");
                            Response.Write("<tbody>");

                            Response.Write("<tr>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">Nombre</th>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.nombre + "</th>");
                            Response.Write("<tr>");

                            Response.Write("<tr>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">RFC</th>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.RFC + "</th>");
                            Response.Write("<tr>");

                            Response.Write("<tr>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:50%; text-align:right" + comillas + ">IpaAgs</th>");
                            Response.Write("<th data-type=" + comillas + "name" + comillas + "class=" + comillas + "ePagos-labelTituloSecundario" + comillas + "style="+ comillas + "padding-bottom: 4px; padding-top: 4px; width:50%" + comillas + ">" + ciudadano.IpaAgs + "</th>");
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
    <div class="uk-container uk-container-expand" >
       <div class="uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " style="background-color:transparent" uk-grid>
          <div class="uk-card uk-card-default uk-card-body uk-border-rounded div1" style="background-color:transparent">
             <h2 class="w3-center123">Lista de opciones</h2>
             <button onclick="myAccFunc('Demo1')" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Pagos</button>
             <div id="Demo1" class="w3-hide">
                <div class="w3-container">
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="uk-container uk-container-expand" >
                   <div class="uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " style="background-color:transparent" uk-grid>
                      <div class="uk-card uk-card-default uk-card-body uk-border-rounded div1" style="background-color:transparent">
                         <table class="uk-table">
                            <thead>
                            </thead>
                            <tbody>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right">OBLIGACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="obligacion"></label></th>
                               </tr>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right">APLICACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="aplicacion"></label></th>
                               </tr>
                               <tr>
                                  <th></th>
                                  <th>
                                     <button type="button" id="BtnIngresar1"  onclick="javascript:Login();" style="background-color:#3B77E0; float: right;">
                                     <img src="assets/img/search.png" class="img-fluid" alt="Responsive image">  INGRESAR
                                     </button>                                  
                                  </th>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             </div>
             <button onclick="myAccFunc('Demo2')" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Adeudos</button>
             <div id="Demo2" class="w3-hide">
                <div class="w3-container">
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="uk-container uk-container-expand" >
                   <div class="uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " style="background-color:transparent" uk-grid>
                      <div class="uk-card uk-card-default uk-card-body uk-border-rounded div1" style="background-color:transparent">
                         <table class="uk-table">
                            <thead>
                            </thead>
                            <tbody>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right" ">OBLIGACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="obligacion"></label></th>
                               </tr>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right" ">APLICACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="aplicacion"></label></th>
                               </tr>
                               <tr>
                                  <th></th>
                                  <th>
                                     <button type="button" id="BtnIngresar2"  onclick="javascript:Login();" style="background-color:#3B77E0; float: right;">
                                     <img src="assets/img/search.png" class="img-fluid" alt="Responsive image">  INGRESAR
                                     </button>                                  
                                  </th>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             </div>
             <button onclick="myAccFunc('Demo3')" class="w3-padding-16 w3-theme w3-button w3-block w3-left-align">Devoluciones</button>
             <div id="Demo3" class="w3-hide">
                <div class="w3-container">
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div class="uk-container uk-container-expand" >
                   <div class="uk-child-width uk-grid-medium uk-grid-match uk-border-rounded " style="background-color:transparent" uk-grid>
                      <div class="uk-card uk-card-default uk-card-body uk-border-rounded div1" style="background-color:transparent">
                         <table class="uk-table">
                            <thead>
                            </thead>
                            <tbody>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right" ">OBLIGACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="obligacion"></label></th>
                               </tr>
                               <tr>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; width:35%; text-align:right" ">APLICACION</th>
                                  <th data-type="name" class="ePagos-labelTituloSecundario" style="padding-bottom: 4px; padding-top: 4px; width:65%"><label id="aplicacion"></label></th>
                               </tr>
                               <tr>
                                  <th></th>
                                  <th>
                                     <button type="button" id="BtnIngresar3"  onclick="javascript:Login();" style="background-color:#3B77E0; float: right;">
                                     <img src="assets/img/search.png" class="img-fluid" alt="Responsive image">  INGRESAR
                                     </button>                                  
                                  </th>
                               </tr>
                            </tbody>
                         </table>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    <%--//Fin Tabla Expander--%>

<%--            <div class="row">
            <div class="col-md-4">--%>
                <% 
                    //if (resultSima.Result == 1)
                    //{
                    //    //Obj Ciudadano
                    //    foreach (var ciudadano in resultSima.SIMACiudadanos)
                    //    {
                    //        Response.Write("<div>Información de ciudadano</div>");
                    //        Response.Write("<div>" + "<strong>" + "Nombre de usuario: " + "</strong>" + ciudadano.nombre + " " + ciudadano.Apellido_Paterno + " " + ciudadano.Apellido_Materno + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "RFC: " + "</strong>" + ciudadano.RFC + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Email: " + "</strong>" + ciudadano.correo_electronico + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Estado: " + "</strong>" + ciudadano.estado + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Municipio: " + "</strong>" + ciudadano.municipio + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Localidad: " + "</strong>" + ciudadano.localidad + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Fraccionamiento: " + "</strong>" + ciudadano.fraccionamiento + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Calle: " + "</strong>" + ciudadano.calle + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Número exterior: " + "</strong>" + ciudadano.numero_exterior + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Número interior: " + "</strong>" + ciudadano.numero_interior + "</div>");
                    //        Response.Write("<div>" + "<strong>" + "Teléfono: " + "</strong>" + ciudadano.telefono + "</div>");
                    //        //Obj Aplicaciones
                    //        Response.Write("<div>Aplicaciones</div>");
                    //        foreach (var aplicacion in ciudadano.Aplicaciones)
                    //        {
                    //            Response.Write("<div>" + "Cuenta Principal: " + aplicacion.cuentaPrincipal + "</div>");
                    //            Response.Write("<div>" + "Cuenta secundaria: " + "<div>" + aplicacion.cuentaSecundaria + "</div>");
                    //            Response.Write("<div>" + "Nombre asociación: " + "<div>" + aplicacion.nombreAsociacion + "</div>");
                    //            Response.Write("<div>" + "Domicilio: " + "<div>" + aplicacion.domicilio + "</div>");
                    //            Response.Write("<div>" + "Obligacion: " + "<div>" + aplicacion.obligacion + "</div>");
                    //            Response.Write("<div>" + "Propietario: " + "<div>" + aplicacion.propietario + "</div>");
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    Response.Write("<div>" + error + "</div>");
                    //}
                %>
<%--            </div>
        </div>--%>



</section>
    <style>
        w3-hide{display:none!important}
        th1{padding-bottom: 4px; padding-top: 4px; background-color:#77D0E3; text-align:right}
        th2{padding-bottom: 4px; padding-top: 4px;}
    </style>
</asp:Content>
