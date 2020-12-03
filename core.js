/**
 * @description Nucleo del estado de cuenta y Pago en línea.
 * @version 1.0
 * @author EEGB <erik.guerrero@ags.gob.mx>
 * @copyright http://epagosmunicipio.ags.gob.mx/
 *
 * Historico de cambios
 * v1.0 – Aún no hay cambios(se empezaran a incluir despues de que salga a produccion)
 */

/**
* @author EEGB <erik.guerrero@ags.gob.mx>
* @date 01/12/2020
* @description Load principal de la aplicación web.
* @param  
* @return  
*/
window.onload = function () {
    
    window.onscroll = function () { scrollFunction() };
    UIkit.util.on('#descuentos_1', 'scrolled', function () {
        alert('echo');
    });

    if (window.location.pathname == '/Asistente.aspx') {
        document.getElementById("vm_block").style.display = "none";
        getInf();
    }

    if (window.location.pathname == '/Recepcion.aspx') {
        getObligacionesAsync();
    } else {
        if (window.location.pathname == '/EstadoDeCuenta.aspx') {
            getEC();
        } else if (window.location.pathname == '/Bridge.aspx') {
            getFocus();
        }
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Obtiene la lista de las Obligaciones y las pinta en la pantalla Recepcion.apx
* @param
* @return
*/
function getObligacionesAsync() {
    ActivarCargando();
    axios.defaults.baseURL = window.location.origin;
    axios.post('Recepcion.aspx/getObligaciones', {
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {        
        if (response.data.hasOwnProperty("d")) {
            var models = JSON.parse(response.data.d);

            if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;
        
            var listaObligaciones_ = document.getElementById('listaObl');
            for (var i = 0; i < listaObligaciones_.length; i++) {                
                listaObligaciones_.remove(i);
            }
            var value1 = "0";
            var texto1 = "--SELECCIONE--";            
            var option = document.createElement("option");
            option.text = texto1;
            option.value = value1;
            listaObligaciones_.add(option);                           
            for (var i = 0; i < models.length; i++) {
                var val = models[i].obligaion;
                var text = models[i].descripcion;
                var option2 = document.createElement("option");
                option2.text = text;
                option2.value = val;
                listaObligaciones_.add(option2);         
            }
        }
        DeactivarCargando();        
    }).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Obtiene la información para el asistente de pago en línea.
* @param  
* @return  
*/
function getInf() {
    ActivarCargando();
    axios.defaults.baseURL = window.location.origin;
    axios.post('Asistente.aspx/getInformacion', {
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
        if (response.data.hasOwnProperty("d")) {
            var models = JSON.parse(response.data.d);

            if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;

            document.getElementById("tot_a_apagar_rp_fa").innerHTML = models.TOTAL;
            document.getElementById("cta_principal_rp_fa").innerHTML = models.CTA_PRIN;
            document.getElementById("obligacion_rp_fa").innerHTML = models.OBLIGACION;
            document.getElementById("aplicacion_rp_fa").innerHTML = models.APLICACION;

        }
        DeactivarCargando();
        document.getElementById("vm_block").style.display = "block";
    }).catch(function (error) {
        DeactivarCargando();
        window.location.href = "Error.aspx?Exception=" + "";
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Navega a Recepcion.apx
* @param
* @return
*/
function irRecepcion() {
    if (window.location.pathname == '/Inicio.aspx') {
        window.location.href = "Recepcion.aspx";
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Navega a Autenticacion.apx
* @param
* @return
*/
function irAutenticacion() {
    if (window.location.pathname == '/Inicio.aspx') {
        window.location.href = "Autenticacion.aspx";
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Activa la accion de cargando en las pantallas de la aplicacion web.
* @param
* @return
*/
function ActivarCargando() {
    document.querySelector('#Cargando').classList.add('loading');
}

/**
* @author EEGB
* @date 01/12/2020
* @description Des-activa la accion de cargando en las pantallas de la aplicacion web.
* @param
* @return
*/
function DeactivarCargando() {
    document.querySelector('#Cargando').classList.remove('loading');
}

/**
* @author EEGB
* @date 01/12/2020
* @description Activa o desactiva el botón para navegar acia arriba.
* @param
* @return
*/
function scrollFunction() {
    var btnUp = document.getElementById("BtnBackUp");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnUp.style.display = "block";
    } else {
        btnUp.style.display = "none";
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Control de navegación y obtención del Estado de Cuenta.
* @param
* @return
*/
function navegar() {
    ActivarCargando();
    var cta_prin = document.getElementById('ctaPrincipal').value;  
    var aplicacion = document.getElementById('listaApl').value;    
    var obligacion = document.getElementById('listaObl').value;    
    if (cta_prin.trim() == "") {
        UIkit.notification({ message: mensaje1_sin_ctaprin });
        DeactivarCargando();
    }
    else {
        if ((obligacion.trim() == "") || (obligacion.trim() == "0")) {            
            UIkit.notification({ message: mensaje2_sin_obl });
            DeactivarCargando();
        }
        else {
            if ((aplicacion.trim() == "") || (aplicacion.trim() == "0")) {                
                UIkit.notification({ message: mensaje3_sin_apl });
                DeactivarCargando();
            }
            else {
                getEstadoCuenta(cta_prin, obligacion, aplicacion);
            }
        }
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Prepara los parametros para la obtención del estado de cuenta.
* @param cta_prin{cuenta principal} obligacion{obligacion} aplicacion{aplicacion}
* @return
*/
function getEstadoCuenta(cta_prin, obligacion, aplicacion) {
    axios.defaults.baseURL = window.location.origin;
    axios.post('EstadoDeCuenta.aspx/ObtieneCuentaPrincipal', {
        headers: { 'Content-Type': 'application/json' },
        parametro1: obligacion,
        parametro2: aplicacion,
        parametro3: cta_prin
    }).then(function (response) {
        DeactivarCargando();
        window.location.href = "EstadoDeCuenta.aspx";
    }).catch(function (error) {
        DeactivarCargando();
        window.location.href = "Error.aspx?Exception=" + "";
    });
}


/**
* @author EEGB
* @date 01/12/2020
* @description Enmascara los montos proporcionados a MXN
* @param monto_{monto en pesos para enmascarar a MXN}
* @return respuesta {monto en formato de pesos mexicanos}
*/
function formatMoney(monto_) {
    var monto = (String(monto_)).replace(',', '');
    var n = monto.indexOf('.');
    var respuesta = "";
    const formatterPeso = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
    
    if (n == 0) {
        var cadena = formatterPeso.format(monto);
        if (monto.length = 4) {
            var x = cadena.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            respuesta = x1 + x2;
        }
        else {
            respuesta = cadena;
        }
    }
    else {        
        var cadena = formatterPeso.format(monto);
        if (monto.length = 4) {
            var x = cadena.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            respuesta = x1 + x2;
        }
        else {
            respuesta = cadena;
        }
    }
    return respuesta;
}


/**
* @author EEGB
* @date 01/12/2020
* @description Pinta el estado de cuenta la pantalla
* @param 
* @return
*/
function getEC(filtro = 6) {
    ActivarCargando();
    axios.defaults.baseURL = window.location.origin;
    axios.post('EstadoDeCuenta.aspx/getEstadoDeCuenta', {
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
        //Se crea el arreglo a partir de la lista d eobjetos que se obtubieron del metodo
        if (response.data.hasOwnProperty("d")) {

            var data = JSON.parse(response.data.d);

            if (data.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + data.MENSAJE;

            if (!data) data = [];

            var TablaDatosHtml = document.getElementById("TablaDatos");
            var ContenedorPaginadoHtml = document.getElementById("Contenedor-Paginacion");

            document.getElementById("obligacion").innerHTML = data.datos_entrada_.obligacion_epagos;
            document.getElementById("aplicacion").innerHTML = data.datos_entrada_.aplicacion_epagos;
            document.getElementById("cuenta_principal").innerHTML = data.datos_entrada_.cuenta_principal;
            document.getElementById("cuenta_secundaria").innerHTML = data.padron_.cveSecundaria;
            document.getElementById("requerimiento").innerHTML = data.gastos_.requerimiento_adeudo_;
            document.getElementById("proceso").innerHTML = data.proceso;
            document.getElementById("contribuyente").innerHTML = data.padron_.nombre_Propie + " " + data.padron_.apater_Propie + " " + data.padron_.amater_Propie;
            document.getElementById("ubicacion_inmueble").innerHTML = data.padron_.ubicacion_inmueble_epagos;
            document.getElementById("domicilio_controbuyente").innerHTML = data.padron_.domicilio_contribuyente_epagos;
            document.getElementById("datos_adicionales").innerHTML = data.padron_.datos_adicionales_epagos;
            document.getElementById("observaciones").innerHTML = data.datos_entrada_.observaciones_estado_cuenta;

            var table = TablaDatosHtml.querySelector('tbody');
            table.innerHTML = "";
            var tr, td;

            for (var i = 0; i < data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a.length; i++) {
                tr = document.createElement("tr");
                tr.id = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].CON + "_" + data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].REFERENCIA;
                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].CON;
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].REFERENCIA;
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].DESCRIPCION;
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].FECHA_MOV.replace('T00:00:00', '');
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].FECHA_VEN.replace('T00:00:00', '');
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].STA;
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].IMPORTE);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i]["%DESC"];
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i]["$DESC"]);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i]["NO. REQUER"];
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i]["ACTU."]);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].MULTAS);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i]["RECARGOS_"]);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = formatMoney(data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].TOTAL);
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                td = document.createElement("td");
                td.innerHTML = data.adeudos_y_contadores.dtAdeudos_accesorios_descuentos_m_y_a[i].CV;
                td.classList.add("ePagos-labelTextoCorrido");
                tr.appendChild(td);

                table.appendChild(tr);               
            }
            Paginador({ table: TablaDatosHtml, box: ContenedorPaginadoHtml, active_class: "ePagos-paginador-numero-activo", box_mode: "list", rows_per_page: 10 });

            var table_foot = TablaDatosHtml.querySelector('tfoot');
            table_foot.innerHTML = "";
            var tr_, th_;
            tr_ = document.createElement("tr");
            tr_.id = "01-foot";
            for (var i = 1; i < 15; i++) {
                th_ = document.createElement("th");
                switch (i) {
                    case 1://SUMA COLUMNA IMPORTE
                        th_.innerHTML = "TOTALES";
                        break;
                    case 7://SUMA COLUMNA IMPORTE
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Adeudos_col_Importe);
                        break;
                    case 9:// SUMA COLUMNA $ DESCUENTO 
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Descuentos_Principal);
                        break;
                    case 11:// SUMA ACTIALUZACION
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Actualizacion);
                        break;
                    case 12:// SUMA MULTAS
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Multa);
                        break;
                    case 13:// SUMA RECARGOS
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Recargos_columna);
                        break;
                    case 14:// SUMA TOTAL
                        th_.innerHTML = formatMoney(data.Totales_generales_.Total_Adeudos_col_Total);
                        break;
                    default:
                        th_.innerHTML = "";
                        break;
                }
                tr_.appendChild(th_);
            }
            table_foot.appendChild(tr_);


            if (!(data.dtDescuentos_manuales_y_automaticos_accesorios.length > 0)) {
                document.getElementById("desc_").classList.add("epagos-hideDiv");
            } else {
                document.getElementById("desc_").classList.add("epagos-showDiv");
            }

            var TablaDatosHtmlDescuentos = document.getElementById("TablaDatosDescuentos");
            var table_desc = TablaDatosHtmlDescuentos.querySelector('tbody');
            table_desc.innerHTML = "";
            var tr_des, td_des;
            for (var x = 0; x < data.dtDescuentos_manuales_y_automaticos_accesorios.length; x++) {
                tr_des = document.createElement("tr");
                tr_des.id = data.dtDescuentos_manuales_y_automaticos_accesorios[x].CON;
                td_des = document.createElement("td");
                td_des.innerHTML = data.dtDescuentos_manuales_y_automaticos_accesorios[x].CON;
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = data.dtDescuentos_manuales_y_automaticos_accesorios[x].DESCRIPCION;
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = formatMoney(data.dtDescuentos_manuales_y_automaticos_accesorios[x].TOTAL);
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = data.dtDescuentos_manuales_y_automaticos_accesorios[x]["%AUT"];
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = formatMoney(data.dtDescuentos_manuales_y_automaticos_accesorios[x]["$AUT"]);
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = data.dtDescuentos_manuales_y_automaticos_accesorios[x]["%ADI"];
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                td_des = document.createElement("td");
                td_des.innerHTML = formatMoney(data.dtDescuentos_manuales_y_automaticos_accesorios[x]["$ADI"]);
                td_des.classList.add("ePagos-labelTextoCorrido");
                tr_des.appendChild(td_des);

                table_desc.appendChild(tr_des);
            }

            document.getElementById("interes").innerHTML = formatMoney(data.Totales_generales_.Total_Intereses);
            document.getElementById("gastoEjecucion").innerHTML = formatMoney(data.Totales_generales_.Total_Gasto_Ejecucion);
            document.getElementById("gastoCobranza").innerHTML = formatMoney(data.Totales_generales_.Total_Gasto_Cobranza);
            document.getElementById("adeudos").innerHTML = formatMoney(data.Totales_generales_.Total_Adeudo);

            document.getElementById("ret_iva_6").innerHTML = formatMoney(data.Retenciones_.Retencion_TotRetIva6_873);
            document.getElementById("ret_isn").innerHTML = formatMoney(data.Retenciones_.Retencion_TotImpSobreNom_536);
            document.getElementById("iva_16").innerHTML = formatMoney(data.Retenciones_.Retencion_TotIvaPorPagar_537);
            document.getElementById("descuentos").innerHTML = formatMoney(data.Totales_generales_.Total_Descuentos);
            document.getElementById("total_a_pagar").innerHTML = formatMoney(data.Totales_generales_.Total_A_Pagar);
        }
        DeactivarCargando();
    }).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Secciona los registros para paginación de cualquier objeto Table
* @param
* @return
*/
function Paginador(config) {
    var box;
    if (typeof config != "object") throw "Paginator esperaba un objeto de configuración!";
    if (typeof config.get_rows != "function" && !(config.table instanceof Element)) throw "Paginator esperaba una tabla o función get_row";
    if (typeof config.disable == "undefined") config.disable = false;
    if (typeof config.page == "undefined") config.page = 1;
    if (!(config.box instanceof Element)) config.box = document.createElement("div");

    box = config.box;

    if (typeof config.get_rows != "function") {
        config.get_rows = function () {
            var table = config.table
            var tbody = table.getElementsByTagName("tbody")[0] || table;

            children = tbody.children;
            var trs = [];
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeType = "tr") {
                    if (children[i].getElementsByTagName("td").length > 0) {
                        trs.push(children[i]);
                    }
                }
            }
            return trs;
        }
    }
    var get_rows = config.get_rows;
    var trs = get_rows();

    if (typeof config.rows_per_page == "undefined") {
        var selects = box.getElementsByTagName("select");
        if (typeof selects != "undefined" && (selects.length > 0 && typeof selects[0].selectedIndex != "undefined")) {
            config.rows_per_page = selects[0].options[selects[0].selectedIndex].value;
        } else {
            config.rows_per_page = 5;//<-------------------------Num Registros Paginador
        }
    }
    var rows_per_page = config.rows_per_page;

    var page = config.page;
    var pages = (rows_per_page > 0) ? Math.ceil(trs.length / rows_per_page) : 1;

    if (pages < 1) pages = 1;
    if (page > pages) page = pages;
    if (page < 1) page = 1;

    config.page = page;

    for (var i = 0; i < trs.length; i++) {
        if (typeof trs[i]["data-display"] == "undefined") {
            trs[i]["data-display"] = trs[i].style.display || "";
        }
        if (rows_per_page > 0) {
            if (i < page * rows_per_page && i >= (page - 1) * rows_per_page) {
                trs[i].style.display = trs[i]["data-display"];
            } else {
                if (!config.disable) {
                    trs[i].style.display = "none";
                } else {
                    trs[i].style.display = trs[i]["data-display"];
                }
            }
        } else {
            trs[i].style.display = trs[i]["data-display"];
        }
    }

    config.active_class = config.active_class || "active";
    if (typeof config.box_mode != "function" && config.box_mode != "list" && config.box_mode != "buttons") config.box_mode = "button";

    if (typeof config.box_mode == "function") {
        config.box_mode(config);
    } else {
        var make_button;
        if (config.box_mode == "list") {
            make_button = function (symbol, index, config, disabled, active) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.href = "#";
                a.innerHTML = symbol;
                a.addEventListener("click", function (event) {
                    event.preventDefault();
                    this.parentNode.click();
                    return false;
                }, false);
                li.appendChild(a);

                var classes = [];
                if (disabled) {
                    classes.push("disabled");
                }
                if (active) {
                    classes.push(config.active_class);
                }
                li.className = classes.join(" ");
                li.addEventListener("click", function () {
                    if (this.className.split(" ").indexOf("disabled") == -1) {
                        config.page = index;
                        Paginador(config);
                    }
                }, false);
                return li;
            }
        } else {
            make_button = function (symbol, index, config, disabled, active) {
                var button = document.createElement("button");
                button.innerHTML = symbol;
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    if (this.disabled != true) {
                        config.page = index;
                        Paginador(config);
                    }
                    return false;
                }, false);
                if (disabled) {
                    button.disabled = true;
                }
                if (active) {
                    button.className = config.active_class;
                }
                return button;
            }
        }

        var page_box = document.createElement(config.box_mode == "list" ? "ul" : "div");
        if (config.box_mode == "list") {
            page_box.className = "pagination uk-pagination uk-flex-center";
        }

        var left = make_button("", (page > 1 ? page - 1 : 1), config, (page == 1), false);
        left.classList.add("ePagos-paginador-izquierda");
        page_box.appendChild(left);

        for (var i = 1; i <= pages; i++) {
            var li = make_button(i, i, config, false, (page == i));
            page_box.appendChild(li);
        }

        var right = make_button("", (pages > page ? page + 1 : page), config, (page == pages), false);
        right.classList.add("ePagos-paginador-derecha");
        page_box.appendChild(right);
        if (box.childNodes.length) {
            while (box.childNodes.length > 1) {
                box.removeChild(box.childNodes[0]);
            }
            box.replaceChild(page_box, box.childNodes[0]);
        } else {
            box.appendChild(page_box);
        }
    }
    return box;
}

/**
* @author EEGB
* @date 01/12/2020
* @description Obtiene y pinta las aplicaciones dinamicamente, según la obliogación seleccionada.
* @param
* @return
*/
function getObligacionesAsync() {
    ActivarCargando();
    axios.defaults.baseURL = window.location.origin;
    axios.post('Recepcion.aspx/getObligaciones', {
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {        
        if (response.data.hasOwnProperty("d")) {
            var models = JSON.parse(response.data.d);

            if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;

            var listaObligaciones_ = document.getElementById('listaObl');
            for (var i = 0; i < listaObligaciones_.length; i++) {                
                listaObligaciones_.remove(i);
            }

            var value1 = "0";
            var texto1 = "--SELECCIONE--";            
            var option = document.createElement("option");
            option.text = texto1;
            option.value = value1;
            listaObligaciones_.add(option);

            for (var i = 0; i < models.length; i++) {
                var val = models[i].obligaion;
                var text = models[i].descripcion;
                var option2 = document.createElement("option");
                option2.text = text;
                option2.value = val;
                listaObligaciones_.add(option2);                
            }
        }
        DeactivarCargando();        
    }).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Controla el cambio de la obligación en la pantalla de Recepcion.aspx
* @param
* @return
*/
function cambiaObl(listaObl) {
    var obl = listaObl.options[listaObl.selectedIndex].value;
    getAplicacionesAsync(obl);
}

/**
* @author EEGB
* @date 01/12/2020
* @description Obtiene las aplicaciones y las pinta en la pantalla de Recepcion.aspx
* @param
* @return
*/
function getAplicacionesAsync(parametro1_) {
    axios.defaults.baseURL = window.location.origin;
    axios.post('Recepcion.aspx/getAplicaciones', {
        headers: { 'Content-Type': 'application/json' },
        parametro1: parametro1_
    }).then(function (response) {
        if (response.data.hasOwnProperty("d")) {            
            var models = JSON.parse(response.data.d);

            if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;
            var listaAplicaciones_ = document.getElementById('listaApl');

            for (i = listaAplicaciones_.length - 1; i >= 0; i--) {
                listaAplicaciones_.options[i] = null;
            }

            var value1 = "0";
            var texto1 = "--SELECCIONE--";
            if (models.length > 1) {                
                var optionA1 = document.createElement("option");
                optionA1.text = texto1;
                optionA1.value = value1;
                listaAplicaciones_.add(optionA1);
            }            
            for (var i = 0; i < models.length; i++) {
                var val = models[i].aplicacion;
                var text = models[i].descripcion;
                var optionA2 = document.createElement("option");
                optionA2.text = text;
                optionA2.value = val;
                listaAplicaciones_.add(optionA2);                
            }
        }
    }
    ).catch(function (error) {
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Impresión del estado de cuenta
* @param
* @return
*/
function imprimirec() {
    alert('imprmir');
}

/**
* @author EEGB
* @date 01/12/2020
* @description Navegacion y preparación (del pago) para acceder a la vista de Asistente.aspx
* @param
* @return
*/
function iralPago() {
    ActivarCargando();
    axios.defaults.baseURL = window.location.origin;
    axios.post('EstadoDeCuenta.aspx/getInfo', {
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
        if (response.data.hasOwnProperty("d")) {            
            var models = JSON.parse(response.data.d);
            if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;
            getInicializa_pago(models.CTA_PRIN, models.OBLIGACION, models.APLICACION)
        }
    }
    ).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description Asigna la obligación, aplicación y la cuenta principal capturadas en la vista.
* @param cta_prin{cuenta principal} obligacion{obligacion} aplicacion{aplicacion}
* @return
*/
function getInicializa_pago(cta_prin, obligacion, aplicacion) {
    axios.defaults.baseURL = window.location.origin;
    axios.post('Asistente.aspx/inicializaInfo', {
        headers: { 'Content-Type': 'application/json' },
        parametro1: obligacion,
        parametro2: aplicacion,
        parametro3: cta_prin
    }).then(function (response) {
        DeactivarCargando();
        window.location.href = "Asistente.aspx";
    }).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author EEGB
* @date 01/12/2020
* @description controla la seleccion del objeto radiobutton seleccionado para tipo de targeta.
* @param obj {objeto radio selececcionado}
* @return
*/
function control_visa_mastercard(obj) {
    if (obj.name == 'forma_pago') {
        if (obj.id == 'visa_mastercard') {
            document.getElementById('visa_mastercard').checked = true;
            document.getElementById('santander').checked = false;
        } else {
            if (obj.id == 'santander') {
                document.getElementById('visa_mastercard').checked = false;
                document.getElementById('santander').checked = true;
            }
        }
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description controla la seleccion del objeto radiobutton seleccionado para tipo de pago(crédito o débito).
* @param obj {objeto radio selececcionado}
* @return
*/
function control_radio_tipo_pago(obj) {
    if (obj.name == 'forma_pago') {
        if (obj.id == 'credito') {
            document.getElementById('credito').checked = true;
            document.getElementById('debito').checked = false;
        } else {
            if (obj.id == 'credito') {
                document.getElementById('credito').checked = false;
                document.getElementById('debito').checked = true;
            }
        }
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description controla la del asistente de pago (Navegación hacia trás)
* @param obj {objeto li block}
* @return
*/
function navega_atras_asistente(obj) {
    switch (obj) {
        case 'vm_block':
            document.getElementById("vm_block").style.display = 'none';
            document.getElementById("fp_block").style.display = 'block';
        case 'fp_block':
            document.getElementById("fp_block").style.display = 'none';
            document.getElementById("vm_block").style.display = 'block';
            break;
        default:
            break;
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Control de validaciones para el asistente de pago
* @param obj {objeto li block}
* @return
*/
function navega_asistente(obj) {
    switch (obj) {
        case 'vm_block':
            if (document.getElementById('visa_mastercard').checked || document.getElementById('santander').checked) {
                if (document.getElementById('visa_mastercard').checked) takeinfo(obj, 'visa/mastercard');
                if (document.getElementById('santander').checked) takeinfo(obj, 'santander');
            }
            else {
                UIkit.notification({ message: mensaje4_llenar_campos });
                return;
            }
            break;
        case 'fp_block':
            if (document.getElementById('credito').checked || document.getElementById('debito').checked) {
                if (document.getElementById('credito').checked) takeinfo(obj, 'credito');
                if (document.getElementById('debito').checked) takeinfo(obj, 'debito');
            } else {
                UIkit.notification({ message: mensaje4_llenar_campos });
                return;
            }
            break;
        default:            
            break;
    }
}

/**
* @author EEGB
* @date 01/12/2020
* @description Control de validaciones para el asistente de pago
* @param obj {objeto li block}
* @return
*/
function takeinfo(block, parametro_) {
    if (block == 'vm_block') {
        ActivarCargando();
        axios.defaults.baseURL = window.location.origin;
        axios.post('Asistente.aspx/informacion2', {
            headers: { 'Content-Type': 'application/json' },
            parametro1: parametro_
        }).then(function (response) {
            if (response.data.hasOwnProperty("d")) {
                var models = JSON.parse(response.data.d);

                if (models.ERROR != undefined) window.location.href = "Error.aspx?Mensaje=" + models.MENSAJE;

                document.getElementById("tot_a_apagar_rp_fp").innerHTML = models.TOTAL;
                document.getElementById("cta_principal_rp_fp").innerHTML = models.CTA_PRIN;
                document.getElementById("obligacion_rp_fp").innerHTML = models.OBLIGACION;
                document.getElementById("aplicacion_rp_fp").innerHTML = models.APLICACION;
            }
            document.getElementById("vm_block").style.display = 'none';
            document.getElementById("fp_block").style.display = 'block';
            DeactivarCargando();
        }).catch(function (error) {
            DeactivarCargando();
            window.location.href = "Error.aspx?Exception=" + "";
        });
    } else {
        if (block == 'fp_block') {
            ActivarCargando();
            axios.defaults.baseURL = window.location.origin;
            axios.post('Asistente.aspx/informacion3', {
                headers: { 'Content-Type': 'application/json' },
                parametro1: parametro_
            }).then(function (response) {                
                window.location.href = 'Bridge.aspx';
                DeactivarCargando();
            }).catch(function (error) {
                DeactivarCargando();
                window.location.href = "Error.aspx?Exception=" + "";
            });
        }
    }
}

/********************************************************** */
/**
* @author JOE
* @date 01/12/2020
* @description Acción Login IpaAgs
* @param
* @return
*/
function Login() {
    ActivarCargando();
    var usuario = document.getElementById('Usuario').value;
    var pass = document.getElementById('Contrasena').value;

    if (usuario == undefined || usuario == '' || usuario == null) {
        DeactivarCargando();
        UIkit.notification({ message: mensaje6_Valida_Login });
        return;
    }

    if (pass == undefined || pass == '' || pass == null) {
        DeactivarCargando();
        UIkit.notification({ message: mensaje6_Valida_Login });
        return;
    }

    axios.defaults.baseURL = window.location.origin;
    axios.post('PagosyAdeudos.aspx/LoginVerificacion', {
        headers: { 'Content-Type': 'application/json' },
        parametro1: usuario,
        parametro2: pass
    }).then(function (response) {
        //if (response.data.hasOwnProperty("d")) {
        //    //var data = JSON.parse(response.data.d);
        //    //if (!data) data = [];
        //    //var TablaDatosHtml = document.getElementById("TablaDatos");
        //    //var ContenedorPaginadoHtml = document.getElementById("Contenedor-Paginacion");
        //    document.getElementById("RFC").innerHTML = response.data;
        //}
        DeactivarCargando();
        window.location.href = "PagosyAdeudos.aspx";
    }).catch(function (error) {
        DeactivarCargando();
        var mensaje = "Intentalo más tarde";
        window.location.href = "Error.aspx?Mensaje=" + mensaje;
    });
}

/**
* @author JOE
* @date 03/12/2020
* @description Funcion para la tabla, efecto expandir
* @param
* @return
*/
function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function Alert(id) {
    //var facturar = document.getElementById(facturar);
    //var imprimir = document.getElementById(imprimir);

    if (id == "facturar") {
        alert("Facturar");
    }
    if (id == "imprimir") {
        alert("imprimir");
    }
    else {
        alert(id);
    }
}

/* #BEGINREGION - MENSAJES PARA EL USUARIO FINAL */

var mensaje1_sin_ctaprin = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Debes de Ingresar la Cuenta Principal.</p>" +
    "</div>";
var mensaje2_sin_obl = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Debes de Ingresar la Obligación.</p>" +
    "</div>";
var mensaje3_sin_apl = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Debes de Ingresar la Aplicación.</p>" +
    "</div>";

var mensaje4_llenar_campos = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Debes elejir una opción.</p>" +
    "</div>";

var mensaje5_llenar_campos = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Debes completar todos las opciones requeridas(*).</p>" +
    "</div>";  

var mensaje6_Valida_Login = "<div uk-alert>" +
    "<a class='ePagos-labelTituloPrincipal' style='color:red;'><span uk-icon='icon: warning'></span> Información</p>" +
    "<p class='ePagos-labelTextoCorrido'>Favor de introducir usario y contraceña.</p>" +
    "</div>"; 

/* #ENDREGION - MENSAJES PARA EL USUARIO FINAL */
