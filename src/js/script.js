$(function () {

    // let v = $(this);
    // //console.log(v);
    // var scriptSource = (function() {
    //     var scripts = $('script[src]');
    //     return scripts[scripts.length - 1].src
    // }());
    //
    // var params = parseQueryString(scriptSource.split('?')[1]);
    // //console.log(params);
    // function parseQueryString(queryString) {
    //     var params = {};
    //     if (queryString) {
    //         var keyValues = queryString.split('&');
    //         for (var i=0; i < keyValues.length; i++) {
    //             var pair = keyValues[i].split('=');
    //             params[pair[0]] = pair[1];
    //         }
    //     }
    //     return params;
    // }
var page='';
    let data = '';
    let voiceType = 'UK English Female';
    if(page == 'index'){
        $.getJSON('https://jsonip.com/?callback=?', function(data) {       
            ipaddress=data.ip;
            ////console.log(makeKeyFromIPAndID(ipaddress,0))     
            getDataFromJson();
      });
    }else if(page=='widget'){
        getDataFromJson();
    }
   
    function getDataFromJson(){/*
    $.getJSON(document.URL + 'data.json?version='+new Date().getTime())
        .done(function (json) {              
            data = json[ipaddress];  
            //console.log(data)          ;
            if(page == 'index' && data==null){
                data = [];                       
            } else if (page == 'widget' && (data == null || data[projectId] == null)) {                
                location.href='home';
            }
            
            if(page == 'index'){
                $(".cName").text('Your Name');            
                $(".img").attr('src' , 'src/img/default.jpg');            
                voiceType = 'UK English Female';
            }else if(page=='widget'){
                $("#projectName").text(data[projectId].project["pname"]);            
                $(".cName").text(data[projectId].project['name']);            
                $(".img").attr('src' , data[projectId].project['url']);            
                voiceType = data[projectId].project['voice'];
                $("#banner").html(data[projectId].project["banner"]);  
            }
            fillVoice();
            start();
            pTbl();
        });
    */}    

    // let voicelist = responsiveVoice.getVoices();

    function fillVoice() {
        try{
            $.each(voicelist , function (key , value) {
                $('#voice')
                    .append($("<option></option>")
                        .attr("value" , value.name)
                        .text(value.name));
            });
            $("#voice>option[value='" + voiceType + "']").prop("selected" , true);
            $("#voice").select2();
        }catch(err){

        }          
    }

    // var saveData = (function () {
    //     var a = document.createElement("a");
    //     document.body.appendChild(a);
    //     a.style = "display: none";
    //     return function (data , fileName) {
    //         var json = JSON.stringify(data) ,
    //             blob = new Blob([json] , {type: "octet/stream"}) ,
    //             url = window.URL.createObjectURL(blob);
    //         a.href = url;
    //         a.download = fileName;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //     };
    // }());
    // let fileName = "data.json";

    $("#form").submit(function (e) {
        e.preventDefault();
        $("#msend").trigger("click");
        return false;
    });

    $(".status").html("last seen today at " + getTime());

    let receivedMsg = "";
    let originalMsg = "";
    let tick = "<svg style='position: absolute;transition: .5s ease-in-out;' xmlns='http://www.w3.org/2000/svg' width='16'height='15' id='msg-dblcheck-ack' x='2063' y='2076'><path d='M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z' fill='#4fc3f7'/></svg>";


    $("#msend").click(function () {
        // //console.log(data);
        let scroll = ($(".conversation-container").scrollTop()) + 1550;

        let msg = $("#val").val().trim();
        let res = "<div class='message sent'>" + msg + "<span class='metadata'> <span class='time'>" + getTime() + "</span><span class='tick'>" + tick + "</span></span></div>";

        msg == "" ? $("#val").focus() : ($("#ap").append(res),
            $("#form")[0].reset(), setTimeout(function () {
            $(".status").html("online ")
        } , 900), setTimeout(function () {
            $(".status").html("typing... ")
        } , 1000), receivedMsg = msg.toUpperCase().trim(), originalMsg = msg.trim(), $(".conversation-container").scrollTop(scroll), send());
    });

    // saveData(response, fileName);
    function findQue(que) {
        return que.toUpperCase() === receivedMsg;
    }

    let support = false;

    function send() {
        let scroll = ($(".conversation-container").scrollTop()) + 1550;
        let resMsg = '';
        let speakMsg = '';
        let flag = false;
        if (receivedMsg.substring(0 , 6) == "SEARCH") {
            speakMsg = "This are the top results.";
            resMsg = "<b align='center'>This are the top results </b><nav class='back'  onclick='history.back()'>&larr;</nav><nav class='forword' onclick='history.forward()'>&rarr;</nav><iframe style = 'z-index:1;overflow-x:scroll; overflow-y:scroll;' scrolling='yes' height='300px' width='100%' src='https://www.bing.com/search?q=" + receivedMsg.slice(7) + "'></iframe>";
            flag = true;
        } else if (receivedMsg === 'QUESTIONS' || receivedMsg === 'QUESTION') {
            sendQues(1000);
            return;
            flag = true;
        } else if (receivedMsg === 'DEPARTMENTS' || receivedMsg === 'DEPARTMENT') {
            showDepartment();
            return;
        } else if (receivedMsg === 'KEYWORDS' || receivedMsg === 'KEYWORD') {
            showKeywords();
            return;
        } else if (receivedMsg === 'SUPPORT' || receivedMsg === 'SUPORRTS') {
            speakMsg = "Okay, You require support, Please enter your message";
            resMsg = 'Please enter your Message.';
            support = true;
            flag = true;
        } else if (support) {
            support = false;
            showDepartment(false , true);
            return;
        } else {
            if (flag === false) {
                for (let res in data[projectId]['keywords']) {
                    if (typeof data[projectId]['keywords'][res][0].find(findQue) === 'string') {
                        if(data[projectId].keywords[res][1].indexOf("RSS:") == -1) {
                            speakMsg = resMsg = data[projectId].keywords[res][1];
                        } else {
                            resMsg = "<iframe style = 'z-index:1;overflow-x:scroll; overflow-y:scroll;' scrolling='yes' height='300px' width='100%' src='rss/index.html?rss=" + data[projectId].keywords[res][1].replace('RSS:','') + "'></iframe>";
                        }
                        flag = true;
                        break;
                    }
                }
            }
            if (flag === false) {
                for (let res in data[projectId]['question']) {
                    if (typeof data[projectId]['question'][res].find(findQue) === 'string') {
                        if(data[projectId].question[res][1].indexOf("RSS:") == -1) {
                            speakMsg = resMsg = data[projectId].question[res][1];
                        } else {
                            resMsg = "<iframe style = 'z-index:1;overflow-x:scroll; overflow-y:scroll;' scrolling='yes' height='300px' width='100%' src='rss/index.html?rss=" + data[projectId].question[res][1].replace('RSS:','') + "'></iframe>";
                        }
                        flag = true;
                        break;
                    }
                }
            }
            if (flag === false) {
                for (let res in data[projectId]['department']) {
                    if (typeof data[projectId]['department'][res].find(findQue) === 'string') {
                        speakMsg = "Contact to the department.";
                        resMsg = "Contact Department Through : <a href='https://api.whatsapp.com/send?phone=" + data[projectId]['department'][res][1] + "' target='_blank'>" + data[projectId]['department'][res][0] + " Department</a>";
                        flag = true;
                        break;
                    }
                }
            }
        }
        if (flag === false) {
            speakMsg = "Sorry, I didn't understand. For list of Keywords type keywords or if you have another question then type questions or Contact for support.";
            resMsg = "Sorry, I didn't understand, please enter proper spelling. For list of supported Keywords type <b>KEYWORDS</b> or if you have a question then type <b>QUESTIONS</b>"			
            showDepartment(false);
        }

        let res = "<div class='message received'>" + resMsg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
        setTimeout(function () {
            $('#ap').append(res);
            $(".status").html("online");
            $(".conversation-container").scrollTop(scroll);
        } , 1100);
        speak(strip_html_tags(speakMsg));

    }
    function strip_html_tags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    function start() {
        $(".message").remove(); //Remove all previous messages
        let scroll = ($(".conversation-container").scrollTop()) + 1550;
        let resMsg = "Hello, hope your good. I can provide any assistance.";
        let res = "<div class='message received'>" + resMsg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
      
        $('#ap').append(res);
        $(".status").html("online");

        resMsg = "Choose from the menu or type your question to get started. <br><hr>";
        resMsg += '<a href="javascript:void(0)" class="que-link start-link" data-que="question">Questions</a>';
        resMsg += '<a href="javascript:void(0)" class="que-link start-link" data-que="keywords">Keywords</a>';
        resMsg += '<a href="javascript:void(0)" class="que-link start-link" data-que="support">Support</a>';
        res = "<div class='message received'>" + resMsg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
        setTimeout(function () {
            $('#ap').append(res);
            $(".status").html("online");
            $(".conversation-container").scrollTop(scroll);

            $(".start-link").on('click' , function () {
                let que = $(this).data('que');
                if (que === 'question') {
                    sendQues();
                    return;
                } else if (que === 'keywords') {
                    showKeywords();
                    return;
                } else {
                    speakMsg = "Okay, You require support, Please enter your message";
                    resMsg = 'Please enter your Message.';
                    support = true;
                }
                res = "<div class='message received'>" + resMsg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
                setTimeout(function () {
                    $('#ap').append(res);
                    $(".status").html("online");
                    $(".conversation-container").scrollTop(scroll);
                } , 1100);
                speak(strip_html_tags(speakMsg));
            });

        } , 1100);
        let speakMsg = "Hello, hope your good. I can provide any assistance. Choose from the menu or type your question to get started.";
        speak(strip_html_tags(speakMsg));
        //Vladimir - set chat box page and chat button URL
        $("#inputChatBoxPage").val(location.href+"widget.php?key="+makeKeyFromIPAndID(ipaddress,projectId));
        $("#inputChatBoxIframe").val(
            '<iframe src="'+location.href+'widget.php?key='+makeKeyFromIPAndID(ipaddress,projectId)
            +'" height="600" width="100%" align="center" overflow-y="hidden"></iframe>'
        );
        $("#inputChatButtonJS").val(            
            '<script src="'+location.href+'button/'+makeKeyFromIPAndID(ipaddress,projectId)
            +'.js"></script>'
        );
        
    }

    function showKeywords(flag = true , key = null , page = 0) {
        let scroll = ($(".conversation-container").scrollTop()) + 1550;
        let resMsg = '';
        if (flag) {
            let speakMsg = "Following are all supported keywords";
            resMsg = 'Following are all supported keywords  <br><hr><span data-key="' + Math.floor((Math.random() * 100) + 1) + '">';
            speak(strip_html_tags(speakMsg));
        }
        let len = data[projectId].keywords.length;
        let lastKey = ((len > page + 10) ? page + 10 : len);
        for (let key = page; key < lastKey; key++) {
            resMsg += '<a href="javascript:void(0)" data-key="' + key + '" class="key-link">' + data[projectId].keywords[key][0][0] + ((key !== (lastKey - 1)) ? ', ' : '');
        }
        if (len > page + 10) {
            resMsg += '<a href="javascript:void(0)" data-key="' + Math.floor((Math.random() * 100) + 1) + '" data-page="' + (page + 10) + '" class="more-link">...MORE</a></span>';
        }

        setTimeout(function () {
            if (flag) {
                let res = "<div class='message received'>" + resMsg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
                $('#ap').append(res);
            } else {
                $('span[data-key="' + key + '"]').append(', ' + resMsg);
            }
            $(".status").html("online");
            $(".conversation-container").scrollTop(scroll);

            $(".key-link").on('click' , function (e) {
                if (e.handled !== true) {
                    let key = $(this).data('key');
                    let res = "<div class='message sent'>" + data[projectId].keywords[key][0][0] + "<span class='metadata'> <span class='time'>" + getTime() + "</span><span class='tick'>" + tick + "</span></span></div>";
                    $('#ap').append(res);
                    $(".conversation-container").scrollTop(scroll);
                    receivedMsg = data[projectId].keywords[key][0][0].toUpperCase().trim();
                    send();
                    e.handled = true;
                }
                return false;
            });

            $(".more-link").on('click' , function () {
                key = $(this).parent('span').data('key');
                page = $(this).data('page');
                showKeywords(false , key , page);
                $(this).remove();
            })
        } , ((flag) ? 1100 : 0));
    }

    function sendQues() {
        let scroll = ($(".conversation-container").scrollTop()) + 1550;

        let msg = 'Select Question to get started. <br><hr>';

        for (let que in data[projectId].question) {
            msg += '<a href="javascript:void(0)" class="que-link ques" data-que="' + que + '">' + data[projectId].question[que][0] + '</a>';
        }

        let res = "<div class='message received'>" + msg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
        setTimeout(function () {
            $('#ap').append(res);
            $(".status").html("online");
            $(".conversation-container").scrollTop(scroll);

            $(".ques").on('click' , function () {
                let key = $(this).data('que');
                let res = "<div class='message sent'>" + data[projectId].question[key][0] + "<span class='metadata'> <span class='time'>" + getTime() + "</span><span class='tick'>" + tick + "</span></span></div>";
                $('#ap').append(res);
                $(".conversation-container").scrollTop(scroll);
                if(data[projectId].question[key][1].indexOf("RSS:") == -1) {
                    res = "<div class='message received'>" + data[projectId].question[key][1] + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
                    speak(strip_html_tags(data[projectId].question[key][1]));
                } else {
                    res = "<div class='message received'><iframe style = 'z-index:1;overflow-x:scroll; overflow-y:scroll;' scrolling='yes' height='300px' width='100%' src='rss/index.html?rss=" + data[projectId].question[key][1].replace('RSS:','') + "'></iframe><span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";

                }
                setTimeout(function () {
                    $('#ap').append(res);
                    $(".status").html("online");
                    $(".conversation-container").scrollTop(scroll);
                } , 1100);
            });

        } , 1100);
        msg = "Select Question to get started";
        speak(msg);

    }

    function showDepartment(flag = true , department = false) {
        let scroll = ($(".conversation-container").scrollTop()) + 1550;
        let delay = (flag == true || department == true) ? 1100 : 2000;
        let msg;
        if (department)
            msg = 'Select Department Link :  <br><hr>';
        else
            msg = 'Contact Department through Link :  <br><hr>';

        for (let que in data[projectId].department) {
            if (data[projectId]['department'][que][0] === 'WhatsApp'){
                msg += '<a href="https://api.whatsapp.com/send?phone=' + data[projectId]['department'][que][2] + ((department === true) ? '&text=' + encodeURI(originalMsg) : '') + '" target="_blank" class="que-link"><i class="fab fa-whatsapp"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }else if ((data[projectId]['department'][que][0] === 'Messenger')){
                msg += '<a href="https://m.me/' + data[projectId]['department'][que][2] + '" target="_blank" class="que-link"><i class="fab fa-facebook-messenger"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }else if ((data[projectId]['department'][que][0] === 'Skype')){
                msg += '<a href="skype:' + data[projectId]['department'][que][2] + '?chat" target="_blank" class="que-link"><i class="fab fa-skype"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }else if ((data[projectId]['department'][que][0] === 'Telegram')){
                msg += '<a href="https://t.me/' + data[projectId]['department'][que][2] + '" target="_blank" class="que-link"><i class="fab fa-telegram"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }else if ((data[projectId]['department'][que][0] === 'Email')){
                msg += '<a href="mailto:' + data[projectId]['department'][que][2] + '?subject=Support' + ((department === true) ? '&body=' + encodeURI(originalMsg) : '') + '" target="_blank" class="que-link"><i class="far fa-envelope"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }else if ((data[projectId]['department'][que][0] === 'Phone')){
                msg += '<a href="tel:' + data[projectId]['department'][que][2] + '" target="_blank" class="que-link"><i class="fas fa-phone"></i> ' + data[projectId].department[que][1] + ' department </a>';
            }
        }

        let res = "<div class='message received'>" + msg + "<span class='metadata'> <span class='time'>" + getTime() + "</span></span></div>";
        setTimeout(function () {
            $('#ap').append(res);
            $(".status").html("online");
            $(".conversation-container").scrollTop(scroll);
        } , delay);
        if (flag)
            speak("Following are our the department.");
        if (department)
            speak("okay, please click a department link");
    }

    let profile = [];
    
    $("#visitWidgetButton").on("click", function () {
      window.open($("#inputChatBoxPage").val(), "_blank");
    });

    $("#save").on('click' ,async function () {
        let dName = $(".dName");
        let dNo = $(".dNo");
        let type = $(".type");

        let que = $(".que");
        let Qans = $(".Qans");

        let keyword = $(".keyword");
        let Kans = $(".Kans");

        let pName = $(".pName").val();
        let industry = $(".industry").val();
        let banner = $("#banner").val();
        let pDesc = $(".desc").val();

        let editId = $("#editId").val();
        let dataLen = data.length;

        if (typeof editId !== "undefined" && editId != '' && await conf() === false){
            return false;
        }

        if (typeof editId !== "undefined" && editId != ''){
            (profile['name'] == '' || typeof profile['name'] === "undefined")? profile['name'] = $("#cName").val() : '';
            data[editId]['department'] = [];
            data[editId]['question'] = [];
            data[editId]['keywords'] = [];
            dataLen = editId;
            $("#editId").val('');
            $("#state").text('NEW');
        }

        var networks = $("select[name='network[]']").map(function(){return $(this).val();}).get();
		var rsskeywords = $("input[name='keyword[]']").map(function(){return $(this).val();}).get();
		
        var len = networks.length;
        var generatedRSS = [];
        for(var i in networks) {
            if (rsskeywords[i] != '') {
                generatedRSS.push('https://suite.social/search/search-result.php?q='+rsskeywords[i]+'&site='+networks[i] + '&rss');
            }
        }
		var streamrss = generatedRSS.join(',');
        
        //projects
        let projects = {
          name: typeof profile["name"] != "undefined" ? profile["name"] : "",
          url: typeof profile["url"] != "undefined" ? profile["url"] : "",
          voice: voiceType,
          pname: pName,
          description: pDesc,
          industry: industry,
          banner: banner,
          posts: $('#posts').val(),
          style: $('#style').val(),
          rssfeed: streamrss,
          key: makeKeyFromIPAndID(ipaddress, dataLen)
        };
        //Department
        let department = [];
        let dLen = dName.length;
        dName.each(function (a , ele) {
            if ($(ele).val() != '' && $(dNo[a]).val() != '' && $(type[a]).val() != '') {
                department.push([$(type[a]).val() , $(ele).val() , $(dNo[a]).val()]);
                // data.department.push([$(type[a]).val(),$(ele).val(),$(dNo[a]).val()]);
            }
            if (dLen === a + 1) {
                $(ele).val('');
                $(dNo[a]).val('');
            } else {
                $(ele).closest('.item').remove();
            }
        });
        //Questions
        let question = [];
        let qLen = que.length;
        que.each(function (a , ele) {
            if ($(ele).val() != '' && $(Qans[a]).val() != '') {
                question.push([$(ele).val() , $(Qans[a]).val()]);
                // data.question.push([$(ele).val(),$(Qans[a]).val()]);
            }
            if (qLen === a + 1) {
                $(ele).val('');
                $(Qans[a]).val('');
            } else {
                $(ele).closest('.item').remove();
            }
        });

        //Keywords
        let keywords = [];
        let wLen = keyword.length;
        keyword.each(function (a , ele) {
            if ($(ele).val() != '' && $(Kans[a]).val() != '') {
                keywords.push([$(ele).val().toUpperCase().split(",") , $(Kans[a]).val()]);
                // data.keywords.push([$(ele).val().toUpperCase().split(",") ,$(Kans[a]).val()]);
                $(ele).val('');
                $(Kans[a]).val('');
            }
            if (wLen === a + 1) {
                $(ele).val('');
                $(Kans[a]).val('');
            } else {
                $(ele).closest('.item').remove();
            }
        });
        data[dataLen] = {'department': department};
        data[dataLen]['keywords'] = keywords;
        data[dataLen]['question'] = question;
        data[dataLen]['project'] = projects;
        if (data[dataLen]['project']['name']=='') data[dataLen]['project']['name']='Your Name';
        if (data[dataLen]['project']['url']=='') data[dataLen]['project']['url']='src/img/default.jpg';
        ////console.log(data[dataLen]);
        $.ajax({
            url: 'save.php' ,
            method: 'post' ,
            data: {
                type: 'details' ,
                ipaddress: ipaddress ,
                len: dataLen ,
                key: makeKeyFromIPAndID(ipaddress, dataLen) ,
                data: data[dataLen]
            } ,
            success: function (res) {
                if (res == true && editId == '') {
                  Swal.fire(
                      'Created!',
                      'Your project has been Created.',
                      'success'
                  )
                }
            } ,
            error: function (e) {
                 //console.log(e);
            }
        });
        $(".pName").val('');
        $("#cName").val('');
        $(".desc").val('');
        $("#banner").summernote("code", ''); //banner
        $(".cName").text("Your Name");
        $(".img").attr("src", "src/img/default.jpg");
        voiceType = "UK English Female";
        fillVoice();
        await pTbl();
    });

    async function conf(){
        let v=  await Swal.fire({
            title: 'Are you sure?',
            text: "You want to Update Details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Edit it!'
        }).then((result) => {
            if (result.value) {
                // Swal.fire(
                //     'Updated!',
                //     'Your file has been Updated.',
                //     'success'
                // )
            }
            return result
        });
        return v.isConfirmed;
    }

    //Delete Swal Alert
    async function deleteconf() {
      let v = await Swal.fire({
        title: "Are you sure?",
        text: "You want to Remove Project!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.value) {
          
        }
        return result;
      });
      return v.isConfirmed;
    }

    $("#submitProfile").on('click' , async function () {
        let cName = $("#cName").val();
        let search = $('#profile').val();
        let type = $('#type').val();

        if (cName == '' || search == '') {
            alert("Please fill the Details");
            return false;
        }

        if (type == 'twitter') {
            $.ajax({
                url: "twitter.php" ,
                type: 'POST' ,
                data: {
                    username: search
                } ,
                success: function (res) {
                    if (res !== "Not Found") {
                        $(".img").attr('src' , res);
                        saveProfile(cName , res)
                    } else {
                        let msg = confirm("Username not found \nWant to Continue???");
                        if (msg) {
                            saveProfile(cName , 'src/img/default.jpg')
                        }
                    }
                }
            });

        } else if (type == 'insta') {
            await $.instagramFeed({
                'username': search ,
                'callback': function (data) {
                    $(".img").attr('src' , data.profile_pic_url_hd);
                    saveProfile(cName , data.profile_pic_url_hd)
                } ,
                on_error: function () {
                    let msg = confirm("Username not found \nWant to Continue???");
                    if (msg) {
                        saveProfile(cName , 'src/img/default.jpg')
                    }
                }
            });
        } else if (search != '') {

            $.ajax({
                url: "ajax.php" ,
                type: 'POST' ,
                data: {
                    action: type ,
                    username: search
                } ,
                success: function (data) {

                    if (data !== "Username not found") {
                        $(".img").attr('src' , data);
                        saveProfile(cName , data)
                    } else {
                        let msg = confirm("Username not found \nWant to Continue???");
                        if (msg) {
                            saveProfile(cName , 'src/img/default.jpg')
                        }
                    }
                }
            });
        }
    });

    function saveProfile(cName , profileUrl) {
        // $.ajax({
        //     url: 'save.php' ,
        //     method: 'post' ,
        //     data: {
        //         type: 'profile' ,
        //         cName: cName ,
        //         profile: profile
        //     } ,
        //     success: function (res) {
        //         if (res == true) {
        //             alert("Details are saved Successfully");
        //         }
        //     } ,
        //     error: function (e) {
        //         //console.log(e);
        //     }
        // });
        profile['name'] = cName;
        profile['url'] = profileUrl;
        $("#cName").val('');
        $("#profile").val('');
        $(".cName").text(profile['name']);
        $(".img").attr('src' , profile['url']);
    }

    $("#voice").on('change' , function () {
        let value = $(this).val();
        voiceType = value;
    });

    $("#delete").on('click' , function () {
        profile['name'] = "Your Name";
        profile['url'] = "src/img/default.jpg";
        $(".cName").text(profile['name']);
        $(".img").attr('src' , profile['url'])
    });
    //
    // $("#updateDepartment").on('click' , function () {
    //     let updatedDName = $("#updatedDName").val();
    //     let updatedDno = $("#updatedDno").val();
    //     let updateId = $("#updateId").val();
    //
    //     if (updatedDName == '' || updatedDno == '') {
    //         alert("Please Fill the proper details.");
    //         return false;
    //     }
    //
    //     data.department[updateId][0] = [updatedDName];
    //     data.department[updateId][1] = [updatedDno];
    //     $.ajax({
    //         url: 'save.php' ,
    //         method: 'post' ,
    //         data: {
    //             type: 'updateDepartment' ,
    //             updateId: updateId ,
    //             updatedDName: updatedDName ,
    //             updatedDno: updatedDno
    //         } ,
    //         success: function (res) {
    //             if (res == true) {
    //                 alert("Details are saved Successfully");
    //             }
    //         } ,
    //         error: function (e) {
    //             //console.log(e);
    //         }
    //     });
    //     // //console.log(data);
    //     // saveData(data , fileName);
    //     // notify();
    //     $("#departmentModal").modal('toggle');
    //     dTbl();
    // });
    //
    // $("#updateQuestion").on('click' , function () {
    //     let updatedQue = $("#updatedQue").val();
    //     let updatedQans = $("#updatedQans").val();
    //     let updateId = $("#updateId").val();
    //
    //     if (updatedQue == '' || updatedQans == '') {
    //         alert("Please Fill the proper details.");
    //         return false;
    //     }
    //
    //     data.question[updateId][0] = [updatedQue];
    //     data.question[updateId][1] = [updatedQans];
    //     $.ajax({
    //         url: 'save.php' ,
    //         method: 'post' ,
    //         data: {
    //             type: 'updateQuestion' ,
    //             updateId: updateId ,
    //             updatedQue: updatedQue ,
    //             updatedQans: updatedQans
    //         } ,
    //         success: function (res) {
    //             if (res == true) {
    //                 alert("Details are saved Successfully");
    //             }
    //         } ,
    //         error: function (e) {
    //             //console.log(e);
    //         }
    //     });
    //     // //console.log(data);
    //     // saveData(data , fileName);
    //     // notify();
    //     $("#questionModal").modal('toggle');
    //     queTbl();
    // });
    //
    // $("#updateKeyword").on('click' , function () {
    //     let updatedKeyword = $("#updatedKeyword").val().toUpperCase().split(",");
    //     let updatedKans = $("#updatedKans").val();
    //     let updateId = $("#updateId").val();
    //
    //     if (updatedKeyword == '' || updatedKans == '') {
    //         alert("Please Fill the proper details.");
    //         return false;
    //     }
    //
    //     data.keywords[updateId][0] = updatedKeyword;
    //     data.keywords[updateId][1] = [updatedKans];
    //     $.ajax({
    //         url: 'save.php' ,
    //         method: 'post' ,
    //         data: {
    //             type: 'updateKeywords' ,
    //             updateId: updateId ,
    //             updatedKeyword: updatedKeyword ,
    //             updatedKans: updatedKans
    //         } ,
    //         success: function (res) {
    //             if (res == true) {
    //                 alert("Details are saved Successfully");
    //             }
    //         } ,
    //         error: function (e) {
    //             //console.log(e);
    //         }
    //     });
    //     // //console.log(data);
    //     // saveData(data , fileName);
    //     // notify();
    //     $("#keywordModal").modal('toggle');
    //     keywordTbl();
    // });
    //

    async function pTbl() {
        ////console.log(data);     
        let html = '';
        $("#example1").DataTable().destroy();
        for (let key in data) {
            let industry = $(".industry>option[value='" + data[key].project["industry"] + "']").text();
            html += '<tr>' +
                '<td><img src="src/' + data[key].project.url + '" class="img-size-50 mr-3 img-circle"/></td>' +
                '<td>' + data[key].project.pname + '</td>' +
                '<td>' + data[key].project.description + '</td>' +
                '<td>30 Days</td>' +
				'<td>' + industry + '</td>' +
                '<td>' +
                /*'<div class="btn-group">' +
                '<button type="button" class="btn btn-success btn-sm">Embed</button>' +
                '<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
                '    <span class="sr-only">Toggle Dropdown</span>' +
                '       <div class="dropdown-menu" role="menu" style="">' +
                '           <a class="dropdown-item" href="#">Chat Box</a>' +
                '           <div class="dropdown-divider"></div>' +
                '           <a class="dropdown-item" href="#">Chat Button</a>' +
                '       </div>' +
                '</button> ' +
                '</div> ' +*/
                '<button type="button" class="btn btn-primary btn-sm view" data-id="' + key + '" data-toggle="modal" data-target="#modal-xl"><i class="fas fa-link"></i> View</button> ' +
                '<button type="button" class="btn btn-info btn-sm edit" data-id="' + key + '"><i class="fas fa-pencil-alt"></i> Edit</button> ' +
                '<button type="button" class="btn btn-danger btn-sm delete" data-id="' + key + '"><i class="fas fa-trash"></i> Delete</button>' +
				'&nbsp;<button type="button" class="btn btn-success btn-sm" data-toggle="modal" data-target="#votes"><i class="fas fa-vote-yea"></i> Votes</button> ' +
                '</td>' +
                '</tr>';
        }
        $("#pTbl").html(html);

        $("#example1").DataTable({
            "responsive": true ,
            "autoWidth": false ,
        });

        // $('#example1').DataTable({
        //     "processing": true ,
        //     "serverSide": true ,
        //     "order": [] ,
        //     "ajax": {
        //         url: "fetch.php" ,
        //         type: "POST" ,
        //     }
        // });
        // setTimeout(function () {
        //     $(".select2").select2();
        // } , 2000);
    }

    // $(document).on('click', '.indus', function(){
    //     var id = $(this).data("id");
    //     let val = $(".industry>option").map(function() { return $(this).val(); });
    //     let text = $(".industry>option").map(function() { return $(this).text(); });
    //     // //console.log(select);
    //     // let select = '<select class="select2"><option>Option</option><option>Option</option><option>Option</option></select>';
    //
    //     var $select = $("<select class='select2 newIndus'></select>");
    //     $.each(text, function(k,v){
    //         var $option = $("<option></option>", {
    //             "text": v,
    //             "value": val[k]
    //         });
    //         $select.append($option);
    //     });
    //
    //     $(this).html($select);
    //     $(".select2").select2();
    // });

    $('#example1 tbody').on('click' , 'tr .view' , function () {
        let id = $(this).data('id');
        dTbl(id);
        queTbl(id);
        keywordTbl(id);
    });
    $(document).on('click' , '.delete' , async function () {
        var id = $(this).data("id");      
        if (await deleteconf()) {
            data = $.grep(data,function (v,k) {
                return k != id;
            });
            $.ajax({
              url: "delete.php",
              method: "POST",
              data: {
                id: id,
                ipaddress: ipaddress,
                key: makeKeyFromIPAndID(ipaddress, id),
              },
              success: function (data) {                 
                $("#example1").DataTable().destroy();
                pTbl();
              },
            });
        }
    });

    // $(document).on('change' , '.indus' , function () {
    //     var id = $(this).data("id");
    //     $(".save[data-id='" + id + "']").removeClass('d-none');
    //     // alert($(this).val())
    // });
    // $(document).on('DOMSubtreeModified' , '.update' , function () {
    //     var id = $(this).data("id");
    //     $(".save[data-id='" + id + "']").removeClass('d-none');
    // });
    // $(document).on('click' , '.save' , function () {
    //
    //     let id = $(this).data("id");
    //     let column_0 = $("div[data-id=" + id + "][data-column=0]").text();
    //     let column_1 = $(".indus").val();
    //     let column_2 = $("div[data-id=" + id + "][data-column=2]").text();
    //
    //     $.ajax({
    //         url: "update.php" ,
    //         method: "POST" ,
    //         data: {id: id , project_name: column_0 , industry: column_1 , desc: column_2} ,
    //         success: function (data) {
    //             $('#example1').DataTable().destroy();
    //             pTbl();
    //         }
    //     });
    //
    //     $(".save[data-id='" + id + "']").addClass('d-none');
    // });

    var dUpdatebind = false;
    function dTbl(id) {
        // let html = '';
        //
        // for (let key in data[id].department) {
        //     html += '<tr>' +
        //         '<td><img src="src/img/default.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"></td>' +
        //         '<td>' + data[id].department[key][1] + '</td>' +
        //         '<td>' + data[id].department[key][0] + '</td>' +
        //         '<td>' + data[id].department[key][2] + '</td>' +
        //         // '<td><button type="button" class="btn btn-success edit-department" data-id="' + key + '" data-toggle="modal" data-target="#departmentModal"><span class="glyphicon glyphicon-pencil"></span></button>&nbsp;<button type="button" class="btn btn-danger delete-department" data-id="' + key + '"><span class="glyphicon glyphicon-remove"></span></td>' +
        //         '</tr>';
        // }
        //
        // $("#dTbl tbody").html(html);

        $("#dTbl").DataTable().destroy();
        $("#dTbl").DataTable({
          processing: true,
          serverSide: true,
          order: [],
          ajax: {
            url:
              "fetch.php",
            method: "POST",
            data: {
              type: "department",
              id: id,
              ipaddress: ipaddress,
            },
          },
        });
        if (!dUpdatebind) {            
            $(document).on("blur", ".dUpdate", function () {
            var did = $(this).data("id");
            var column = $(this).data("column");
            let value = $(this).text();
            $.ajax({
                url: "update.php",
                method: "POST",
                data: {
                id: id,
                ipaddress: ipaddress,
                did: did,
                type: "department",
                column: column,
                value: value,
                },
                success: function () {
                $("#dTbl").DataTable().destroy();
                dTbl(id);
                showInlineUpdate();
                },
            });
            });
            dUpdatebind = true;
        }
    }

    var qUpdatebind = false;
    function queTbl(id) {

        $("#qTbl").DataTable().destroy();
        $("#qTbl").DataTable({
          processing: true,
          serverSide: true,
          order: [],
          ajax: {          
            url: "fetch.php",
            method: "POST",
            data: {
              type: "question",
              id: id,
              ipaddress: ipaddress,
            },
          },
        });
        if (!qUpdatebind) {            
            $(document).on("blur", ".qUpdate", function () {
            ////console.log("qupdated");
            var did = $(this).data("id");

            var column = $(this).data("column");
            let value = $(this).text();
            $.ajax({
                url: "update.php",
                method: "POST",
                data: {
                id: id,
                ipaddress: ipaddress,
                did: did,
                type: "question",
                column: column,
                value: value,
                },
                success: function () {
                $("#qTbl").DataTable().destroy();
                queTbl(id);
                showInlineUpdate();
                },
            });
            });
            qUpdatebind = true;
        }
    }

    var kUpdatebind = false;
    function keywordTbl(id) {
        $("#kTbl").DataTable().destroy();
        $("#kTbl").DataTable({
          processing: true,
          serverSide: true,
          order: [],
          ajax: {           
            url: "fetch.php",
            method: "POST",
            data: {
              type: "keywords",
              id: id,
              ipaddress: ipaddress,
            },
          },
        });
        if (!kUpdatebind) {
            $(document).on("blur", ".kUpdate", function () {
              var did = $(this).data("id");
              var column = $(this).data("column");
              let value = $(this).text();
              if (column == 0) {
                value = value.split(",");
              }
              $.ajax({
                url: "update.php",
                method: "POST",
                data: {
                  id: id,
                  ipaddress: ipaddress,
                  did: did,
                  type: "keywords",
                  column: column,
                  value: value,
                },
                success: function () {
                  $("#dTbl").DataTable().destroy();
                  keywordTbl(id);
                  showInlineUpdate();
                },
              });
            });
            kUpdatebind = true;
        }
        
    }


    $('#example1 tbody').on('click' , 'tr .edit' , function () {
        let id = $(this).data('id');
        projectId = id;
        start();        
        ////console.log('projectid chagn', projectId)
        let queContainer = $("#question");
        let keyContainer = $("#keywords");
        let dContainer = $("#department");
        profile['url'] = data[id].project.url;
        $("#editId").val(id);

        $("#state").text(data[id].project.pname);

        $("html,body").animate({ scrollTop: 0 }, "slow");
        $("#collapse1").addClass('in show');

        $(".industry>option[value='" + data[id].project.industry + "']").prop("selected", true);
        $(".pName").val(data[id].project.pname);
        $(".desc").val(data[id].project.description);

        $("#voice>option[value='" + data[id].project.voice + "']").prop("selected", true);

        $("#cName").val(data[id].project.name);
        $(".cName").text(data[id].project.name); //preview - Name
        $("#previewName").text(data[id].project.name);
        $("#previewImg").attr('src', data[id].project.url);
        $(".img").attr('src', data[id].project.url); //prview -  profile      
        $("#banner").summernote("code", data[id].project.banner); //banner  
        $('#stream_banner').html(data[id].project.banner);

        $(".select2").select2();
        $("#posts").attr('src', data[id].project.posts);
        $("#style").attr('src', data[id].project.style);
        ////console.log(data);
        // new_field_group.find('span.select2').remove();
        for (const i in data[id].question) {
            let clone = queContainer.children().filter('.item:first-child').clone();
            clone.find('select>option[value="' + data[id].question[i][0] + '"]').prop("selected", true);
            clone.find('span.select2').remove();
            clone.find('select.select2').select2();
            clone.find('input').val(data[id].question[i][1]);
            queContainer.append(clone);
        }
        queContainer.children().filter('.item:first-child').remove();

		previewSocialStream(data[id].project.rssfeed, data[id].project.style, data[id].project.posts);
        // for (const i in data[id].keywords) {
        //     let clone = keyContainer.children().filter('.item:first-child').clone();
        //     clone.find('input').val(data[id].keywords[i][0]);
        //     clone.find('textarea').val(data[id].keywords[i][1]);
        //     keyContainer.append(clone);
        // }
        // keyContainer.children().filter('.item:first-child').remove();

        // for (const i in data[id].department) {
        //     let clone = dContainer.children().filter('.item:first-child').clone();
        //     clone.find('input.dName').val(data[id].department[i][1]);
        //     clone.find('input.dNo').val(data[id].department[i][2]);
        //     clone.find('select>option[value="' + data[id].department[i][0] + '"]').prop("selected", true);
        //     dContainer.append(clone);
        // }
        // dContainer.children().filter('.item:first-child').remove();


        $(".editor").on('click', function () {
            item = $(this).closest('.item');
            let data = $(item).data('item');
            if  (data == 'que') {
                val = item.find('.Qans').val();
                if (val != '' && val.indexOf("RSS:") == -1)
                    $("#summernote").summernote('code',val);
                else
                    $("#summernote").summernote('code');
            }else if  (data == 'keyword') {
                val = item.find('.Kans').val();
                if (val != '' && val.indexOf("RSS:") == -1)
                    $("#summernote").summernote('code',val);
                else
                    $("#summernote").summernote('code');
            }
        });

        $(".rss").on('click', function(){
            item = $(this).closest('.item');
            let data = $(item).data('item');
            if  (data == 'que') {
                val = item.find('.Qans').val();
                if (val.indexOf("RSS:") === 0)
                    $("#rssUrl").val(val.replace('RSS:', ''));
                else
                    $("#rssUrl").val('');
            }else if  (data == 'keyword') {
                val = item.find('.Kans').val();
                if (val.indexOf("RSS:") === 0)
                    $("#rssUrl").val(val.replace('RSS:', ''));
                else
                    $("#rssUrl").val('');
            }
        });
    });

    function showInlineUpdate() {/*
        $.getJSON('https://suite.social/chat/data.json?version='+new Date().getTime())
        .done(function (json) {              
            data = json[ipaddress];      
            id = projectId;
        
            let queContainer = $("#question");
            let keyContainer = $("#keywords");
            let dContainer = $("#department");
        

            for (const i in data[id].question) {           
                var index = Number(i) + 1;
                var field = queContainer.find(
                  "div.item:nth-child(" + index + ")"
                );
                field.find("input").val(data[id].question[i][0]);
                field.find("textarea").val(data[id].question[i][1]);
            }

            for (const i in data[id].keywords) {
                var index = Number(i) + 1;
                var field = keyContainer.find("div.item:nth-child(" + index + ")");    
                field.find("input").val(data[id].keywords[i][0]);
                field.find("textarea").val(data[id].keywords[i][1]);         
            }

            for (const i in data[id].department) {          
                var index = Number(i) + 1;
                var field = dContainer.find(
                  "div.item:nth-child(" + index + ")"
                );
                field.find("input.dName").val(data[id].department[i][1]);
                field.find("input.dNo").val(data[id].department[i][2]);
                field
                  .find(
                    'select>option[value="' + data[id].department[i][0] + '"]'
                  )
                  .prop("selected", true);
            }
        });        
    */}
    function getTime() {
        let dt = new Date();
        let hr = dt.getHours();
        let min = dt.getMinutes();
        10 > hr ? hr = "0" + hr : hr;
        10 > min ? min = "0" + min : min;
        12 > hr ? time = hr + ":" + min + " am" : time = (hr - 12) + ":" + min + " pm";

        return time;
    }

    function speak(msg) {
        // responsiveVoice.speak(msg , voiceType);
    }


    let item;
    $(document).on('click' , '.add-more' , function (e) {
        e.preventDefault();
        var container = $(this).closest('.field');
        new_field_group = container.children().filter('.item:first-child').clone();
        new_field_group.find('span.select2').remove();
        new_field_group.find('select.select2').select2();
        new_field_group.find('input').each(function () {
            $(this).val('');
        });
        new_field_group.find('textarea').each(function () {
            $(this).val('');
        });
        container.append(new_field_group);

        $(".editor").on('click', function () {
            item = $(this).closest('.item');
            let data = $(item).data('item');
            if  (data == 'que') {
                val = item.find('.Qans').val();
                if (val != '' && val.indexOf("RSS:") == -1)
                    $("#summernote").summernote('code',val);
                else
                    $("#summernote").summernote('code');
            }else if  (data == 'keyword') {
                val = item.find('.Kans').val();
                if (val != '' && val.indexOf("RSS:") == -1)
                    $("#summernote").summernote('code',val);
                else
                    $("#summernote").summernote('code');
            }
        });

        $(".rss").on('click', function(){
            item = $(this).closest('.item');
            let data = $(item).data('item');
            if  (data == 'que') {
                val = item.find('.Qans').val();
                if (val.indexOf("RSS:") === 0)
                    $("#rssUrl").val(val.replace('RSS:', ''));
                else
                    $("#rssUrl").val('');
            }else if  (data == 'keyword') {
                val = item.find('.Kans').val();
                if (val.indexOf("RSS:") === 0)
                    $("#rssUrl").val(val.replace('RSS:', ''));
                else
                    $("#rssUrl").val('');
            }
        });
    });
    $(document).on('click' , '.remove' , function (e) {
        e.preventDefault();
        $(this).closest('.item').remove();
    });

    $(".editor").on('click', function () {
        item = $(this).closest('.item');
        let data = $(item).data('item');
        let val;
        if  (data == 'que') {
            val = item.find('.Qans').val();
            if (val != '' && val.indexOf("RSS:") == -1)
                $("#summernote").summernote('code',val);
            else
                $("#summernote").summernote('code');
        }else if  (data == 'keyword') {
            val = item.find('.Kans').val();
            if (val != '' && val.indexOf("RSS:") == -1)
                $("#summernote").summernote('code',val);
            else
                $("#summernote").summernote('code');
        }
    });

    $("#saveEditor").on('click', function () {
        let val = $(".note-editable").html();
        let data = $(item).data('item');
        if  (data == 'que') {
            $(item).find('.Qans').val(val);
        }else if  (data == 'keyword') {
            $(item).find('.Kans').val(val);
        }
        $("#summernote").summernote('destroy');
    });

    $(".rss").on('click', function(){
        item = $(this).closest('.item');
        let data = $(item).data('item');
        if  (data == 'que') {
            val = item.find('.Qans').val();
            if (val.indexOf("RSS:") === 0)
                $("#rssUrl").val(val.replace('RSS:', ''));
            else
                $("#rssUrl").val('');
        }else if  (data == 'keyword') {
            val = item.find('.Kans').val();
            if (val.indexOf("RSS:") === 0)
                $("#rssUrl").val(val.replace('RSS:', ''));
            else
                $("#rssUrl").val('');
        }
    });

    $("#saveRss").on('click', function () {
        let val = $("#rssUrl").val();
        let data = $(item).data('item');
        if  (data == 'que') {
            $(item).find('.Qans').val('RSS:'+val);
        }else if  (data == 'keyword') {
            $(item).find('.Kans').val('RSS:'+val);
        }
        $("#rssUrl").val('');
    });

});
