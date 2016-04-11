/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var server="anzor.benjamin.sky";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.getElementById('scan').addEventListener('click', this.scan, false);
        //document.getElementById('encode').addEventListener('click', this.encode, false);
    },

    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    // 
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById('login').addEventListener('click', validate, false);
	    document.addEventListener('offline', checkConnection, false);
        //$(".line-item-summary").hide();
        $("#content-inner").css("display","none")
	    checkConnection();

	//window.open('http://anzor.benjamin.sky/', '_blank', 'location=yes');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    //,

//    scan: function() {
//        console.log('scanning');
//        
//        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
//
//        scanner.scan( function (result) { 
//			load_new_scan(result.text);
			/*
            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
			
			
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            */
			/*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

//        }, function (error) { 
//            console.log("Scanning failed: ", error); 
//        } );
//    },

   /* encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }*/

};

var box_counter = 1;
var found = 0;
function load_new_scan(data){
    if (data){
        found = 1;
        //$(".line-item-summary").show();
        $("#content-inner").show();
        jQuery('#send_all').fadeIn();
        jQuery('#price_enquiry').fadeIn();
        var stockcode=data[0]['stockcode'];


        //var htmlstr = '<div class="scan_box" this_id="'+box_counter+'" id="send_box_'+box_counter+'">';prodlist col-xs-12
        //var htmlstr = '<div class="prodlist col-xs-12" this_id="'+box_counter+'" id="send_box_'+box_counter+'">';

        var htmlstr =          '<div class="views-row views-row-1 views-row-odd views-row-first prodrow out-top" this_id="'+box_counter+'" id="send_box_'+box_counter+'">';
        htmlstr +=              '<div class="views-field views-field-nothing-1"><span class="field-content">';

        htmlstr +=                  '<div class="cartprodname">';
        htmlstr +=                      '<div class="views-field-line-item-title">'+data[0]['description']+'</div>';
        htmlstr +=                      '<div class="views-field-line-item-label">'+data[0]['stockcode']+'</div>';
        htmlstr +=                  '</div></span>';
        htmlstr +=               '</div>';
        htmlstr +=               '<div class="views-field views-field-edit-delete"><span class="field-content">';
        htmlstr +=                      '<a href="#" onClick="remove_scan_box('+box_counter+')" class="delete-line-item btn btn-default form-submit"><img src="img/delete.svg"></a></span>';
        htmlstr +=               '</div>';
        htmlstr +=               '<div class="clearfix"></div>';


        htmlstr +=               '<div class="views-field views-field-edit-quantity">';
        htmlstr +=                      '<span class="views-label views-label-edit-quantity">Qty:</span>';
        htmlstr +=                      '<span class="views-label views-label-edit-quantity">' +
                                            '<div class="form-item form-item-edit-quantity-0 form-type-textfield form-group">' +
                                                '<input title="Qty:" class="form-control form-text ajax-processed" type="text" id="qty_'+box_counter+'" onKeyUp="keyPressEvent(event, this,\'' + stockcode + '\',\'' + box_counter + '\')"  value="1" size="4">' +
                                            '</div>' +
                                        '</span>'+
                                '</div>';

        htmlstr +=              '<div class="views-field views-field-commerce-unit-price">' +
                                         '<span class="views-label views-label-commerce-unit-price"> x </span>' +
                                         '<div id="price'+box_counter+'" class="field-content">'+data[0]['sell_price_1']+'</div>' +
                                '</div>';





        htmlstr +=              '<div class="views-field views-field-commerce-total"><span class="views-label views-label-commerce-total"> = </span>';

        htmlstr +=                      '<div class="field-content price" id="total'+box_counter+'" class="field-content price">'+data[0]['sell_price_1']+'</div>';
        htmlstr +=              '</div>';

        htmlstr +=              '<div class="clearfix"></div>';
        htmlstr +=          '</div>';
      
        jQuery('#prodListId').prepend(htmlstr);


        if ($("#total").text()==""){
            $("#total").text(data[0]['sell_price_1']);
            $("#items").text(1);
        }else{

            var aux=$("#total").text();
            aux=parseFloat(aux)+parseFloat(data[0]['sell_price_1']);
            $("#total").text(aux);
            var auxItems=parseInt($("#items").text());
            auxItems++;
            $("#items").text(auxItems);
        }

        //onblur="checkQty(this,\'' + stockcode + '\',\'' + box_counter + '\')"

        //$("#qty_"+box_counter).on("tap",function(){
            //$('#price'+box_counter).text("hi");
            //checkQty($('#qty_'+box_counter),stockcode ,box_counter);

        //    alert($(this).val());
           // $('#total'+box_counter).append("hi");
       // });
        box_counter++;
    }else{
        alert("wrong product");
    }
}

function keyPressEvent(e, obj, stockcode, box_counter) {
    var evt = e || window.event;
    var keyPressed = evt.which || evt.keyCode;
    //if (keyPressed == 13) {
    //    document.getElementById('goButton').click();
    //    evt.cancel = true;
    //}
    //alert ($(obj).val());
    checkQty(obj, stockcode ,box_counter);
}

function remove_scan_box(scan_box_id){
    //alert($("#total"+scan_box_id).text());
	jQuery('#send_box_'+scan_box_id).fadeOut();
    //$("#total").text(parseFloat($("#total").text())-parseFloat($("#total"+scan_box_id).text()));
    $("#total").text(Number((parseFloat($("#total").text())-parseFloat($("#total"+scan_box_id).text())).toFixed(4)));
    $("#items").text(parseFloat($("#items").text())-1);
}
function send_order(scan_box_id){
	jQuery('#send_box_'+scan_box_id).animate({
		opacity: 0,
		left: "+=2000"
	}, 1000, function() {
		jQuery('#send_box_'+scan_box_id).remove();
	});
}

function send_all(){
	found = 0;
	
	jQuery('#send_all').fadeOut();
    jQuery('#price_enquiry').fadeOut();
	jQuery('.scan_box').each(function(){
		var this_id = jQuery(this).attr('this_id');
		send_order(this_id);
	});
}

/*function to recharge the app when the connection is broke*/
function rechargable(){ 
    window.location.reload();
}

/*Check connection drupal and list category_name*/
function listar(){
	//alert('hi');
        var url = 'http://'+server+'/anzor_services/category-name';
        return $.ajax({
            type: "GET",
            url: url,
            timeout: 60 * 1000
        }).done(function (data) {
        //alert('hey');
        var htmlstr='<table>';
        htmlstr +='<tr><td>Category Name</td></tr>';
        for (var i in data){
            htmlstr += '<tr><td>'+data[i]['category_name']+'</td></tr>';
        }
        htmlstr += '</table>';
        jQuery('#content-inner').prepend(htmlstr);
    }).fail(function (a, b, c) {
        console.log(b + '|' + c);
    });
}

/*Product validation*/
function validateProduct(barCode){
    var url = 'http://'+server+'/anzor_services/product';
    //var usr = $("#usr").val();// btoa atob(encodedData);
    //var pass = $("#pass").val();
    //alert (usr);
    //alert (pass);
    //jQuery('#content-inner').prepend(pass);
    $("#to_hide3").css("display","none");
    $("#to_hide2").css("display","none");
    $("#start_scan").removeClass("col-xs-12").addClass( "col-xs-9" );
    $("#scan").html('<img src="img/search.svg">Add new product</a>');
    $('#addimg .col-xs-3').remove();
    $("#addimg").prepend('<div class="logo small col-xs-3"><img src="img/anzor_logo_s.png"></div>');
    $("#bar_code").addClass("fixed");

    var uid=$("#uid").val();
    //alert(uid);
    return $.ajax({
        type: "GET",
        data: { barCode: barCode, uid : uid} ,
        url: url,
        timeout: 60 * 1000
    }).done(function (data) {
        //alert('hey');
//        var htmlstr='<table>';
//        htmlstr +='<tr><td>Category Name</td></tr>';
//        for (var i in data){
//            //htmlstr += '<tr><td>'+data[i]['category_name']+'</td></tr>';
//            htmlstr += '<tr><td>'+data[i]+'</td></tr>';
//        }
//        htmlstr += '</table>';
            load_new_scan(data);
        /*if (data){
            var htmlstr='<button class="topcoat-button event" id="scan"><img src="img/barcode-scanner_button.png" height="100px" /></button>';
            $("#bar_code").html(htmlstr);
            document.getElementById('scan').addEventListener('click', scan, false);
            document.getElementById('encode').addEventListener('click', encode, false);
        }else{
            alert("usr & pass goes wrong");
        }*/
    }).fail(function (a, b, c) {
        console.log(b + '|' + c);
    });
}

/*User validation*/
function validate(){
    var url = 'http://'+server+'/anzor_services/login';
    var usr = $("#usr").val();// btoa atob(encodedData);
    var pass = $("#pass").val();
    //alert (usr);
    //alert (pass);
    //jQuery('#content-inner').prepend(pass);
    return $.ajax({
        type: "GET",
        data: { name: usr, pass : pass} ,
        url: url,
        timeout: 60 * 1000
    }).done(function (data) {
        //alert('hey');

        if (data){
            $("#to_hide3").css("display","none");
            $("#f1").css("display","none");
            var uid=data[0]['uid'];
            //var htmlstr='<input type="hidden" name="uid" value="'+uid+'"><button class="topcoat-button event" id="scan"><img src="img/search.svg" height="100px" /></button>';
            var htmlstr='<div id="to_hide2" class="pagetxt col-xs-12">'+
                            '<div class="logo"><img src="img/anzor_logo.png"></div>' +
                            '<h1>Add product</h1>'+
                            '<p class="text-center">Put product opposite your phone camera, fit barcode to scanning area and wait until we recognize it.</p>'+
                            //'<input type="hidden" name="uid" value="'+uid+'"><button class="btn btn-default scan" id="scan"><img src="img/search.svg" height="100px" />Start scanning</button>'+
                            '<input type="hidden" id="uid" value="'+uid+'">'+
                            //'<a id= "scan" href="#" class="btn btn-default scan"><img src="img/search.svg">Start scanning</a>'+
                        '</div>'+

                        '<div id="addimg" class="pagetxt col-xs-12">' +
                            '<div id="start_scan" class="scanbttn col-xs-12">'+
                                '<a id="scan" href="#" class="btn btn-default scan"><img src="img/search.svg">Start scanning</a>'+

                            '</div>' +
                        '</div>';
            $("#bar_code").html(htmlstr);
            document.getElementById('scan').addEventListener('click', scan, false);
            document.getElementById('encode').addEventListener('click', encode, false);
        }else{
            alert("usr & pass goes wrong");
        }
    }).fail(function (a, b, c) {
        console.log(b + '|' + c);
    });
}

/*probando */
    function scan() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 
            
            //validateProduct(result.text);

            validateProduct('9420019451401');
            
			//load_new_scan(result.text);
			/*
            alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  

           console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
			
			
            document.getElementById("info").innerHTML = result.text;
            console.log(result);
            */
			/*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    }

    function encode() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }


/*Check connection internet*/
function checkConnection() {
	//alert("No Internet Connection");
	// check to see if the network is reachable
	//alert('entro');
	var networkState = navigator.connection.type;
	if (networkState=='none'){
            //alert('No Internet Connection');
            var htmlstr='<div id="msgNoConn">';
            htmlstr+='<p>Cannot establish connection</p>';
            htmlstr+='<p>with the Anzor server.</p>';
            htmlstr+='<br><br>';
            htmlstr+='<p>You need to be</p>';
            htmlstr+='<p>connected to the Internet</p>';
            htmlstr+='<br><br>';
            htmlstr+='<input type="button" id="recharge" value="Try again">';
            htmlstr+='</div>';
            jQuery('.content').html(htmlstr);
            document.getElementById('recharge').addEventListener('click', rechargable, false);
        }
	//alert('paso');
	//alert(networkState);
	//document.addEventListener("offline", function(){ navigator.notification.alert("No connection found") }, false);
	//connectionStatus = navigator.connection;
	//alert(connectionStatus[0]);

	
        /*var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        alert('Connection type: ' + states[networkState]);*/
    }

/*calculate the price per line*/
function checkQty(obj, stockcode, box_counter){
    //alert($(obj).val());
    //alert(stockcode);
    var stock=stockcode;
    var usr = $("#usr").val();// btoa atob(encodedData);
    var pass = $("#pass").val();
    var qty = $(obj).val();
    var url = 'http://'+server+'/anzor_services/price';
    var uid=$("#uid").val();//data[0]['uid'];
    //alert (usr);
    //alert (pass);
    var price=$('#price'+box_counter).text();
    //alert (price);
    return $.ajax({
        type: "GET",
        data: { name: usr, pass : pass, scode:stock, qty: qty, price:price, uid:uid} ,
        url: url,
        timeout: 60 * 1000
    }).success(function (data) {


        if (data){
            //alert(box_counter);
            var auxLinea=parseFloat($("#total"+box_counter).text());
            $("#total"+box_counter).text(data[0]['price']);
            var aux=$("#total").text();
            aux=parseFloat(aux)+parseFloat(data[0]['price'])-parseFloat(auxLinea);
            aux=aux.toFixed(4);
            $("#total").text(aux);
        }else{
            alert("sth goes wrong");
        }
    }).fail(function (a, b, c) {
        console.log(b + '|' + c);
    });
}

function openURL(){
    var url = 'http://www.google.com'
        var ref = window.open(url, '_system', location=yes);
}