$(document).ready(function(){
    var city = [];  //사용자가 클릭한 곳의 도시명을 순서대로 넣을 공간 (사용자가 좌측부터 클릭한다는 보장을 할 수 없기 때문)
    var myKey = "7a69a1a267707ce60734f74ffc663e12";
    var state_icon = "";

    var w_box = `
    <li>
        <div class="top">
            <div class="cur_icon"><i class="wi "></i></div>
            <div class="info">
                <p class="temp"><span>10</span>&nbsp;˚C</p>
                <h4>Cloud</h4>
                <p><span class="city">NewYork</span>,&nbsp;<span class="nation">US</span></p>
            </div>
        </div>
        <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span>1.2</span>&nbsp;m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span>50</span>&nbsp;%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloud"></i>
                <p><span></span>&nbsp;%</p>
            </div>
        </div>
    </li>
    `;

    //배열 데이터의 개수를 활용하여 각 도시별 날씨 정보를 요청할 때마다 받는다면
    function w_info(){
        //배열 데이터의 개수와는 상관없이 날씨의 개별 박스를 모두 제거
        $("#weather ul").empty();

        //현재 시점에서 배열의 개수만큼 다시 반복하여 생성해라(renewal - 갱신)
        for(i=0; i<city.length; i++){
            $("#weather ul").append(w_box);
        }

        $("#weather ul li").each(function(index){
            $.ajax({
                url:"https://api.openweathermap.org/data/2.5/weather?q=" + city[index] + "&appid=" + myKey,
                dataType:"json",
                success:function(data){
                    console.log(data);
                    console.log("현재 온도(˚C) : " + parseInt(data.main.temp - 273.15));
                    var temp = parseInt(data.main.temp - 273.15);
                    console.log("현재 습도(%) : " + data.main.humidity);
                    var humidity = data.main.humidity;
                    console.log("현재 날씨 : " + data.weather[0].main);
                    var weather = data.weather[0].main;
                    console.log("현재 풍속(m/s) : " + data.wind.speed);
                    var wind = data.wind.speed;
                    console.log("국가명 : " + data.sys.country);
                    var nation = data.sys.country;
                    console.log("도시명 : " + data.name);
                    var region = data.name;
                    console.log("구름 양(%) : " + data.clouds.all);
                    var cloud = data.clouds.all;

                    //텍스트(weather의 데이터:clear, rain, ...)로 받아온 현재 날씨를 이미지 아이콘으로 변경 (클래스명을 구성하여 추가하기 위함)
                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloud";
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Snow"){
                        state_icon = "wi-snow";
                    }else if(weather == "Haze"){
                        state_icon = "wi-day-haze";
                    }else if(weather == "Drizzle"){
                        state_icon = "wi-day-rain-mix";
                    }else if(weather == "Fog"){
                        state_icon = "wi-fog";
                    }else if(weather == "Smoke"){
                        state_icon = "wi-smoke";
                    }else if(weather == "Mist"){
                        state_icon = "wi-dust";
                    }

                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(index).find(".temp span").text(temp);
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".city").text(region);
                    $("#weather li").eq(index).find(".nation").text(nation);
                    $("#weather li").eq(index).find(".wind span").text(wind);
                    $("#weather li").eq(index).find(".humidity span").text(humidity);
                    $("#weather li").eq(index).find(".cloud span").text(구름);
                }
            });
        });
    }


    $(".cities button").click(function(){
        var $city_txt = $(this).text();  //클릭한 곳의 텍스트를 저장
        city.push($city_txt);
        console.log(city);
        //$(this).hide();
        $(this).prop("disabled", true);
        w_info();
    });


    function search(){
        var $search_val = $("#search_box").val();  //get 방식

        if($search_val.length < 1){  //입력값이 존재하지 않을 때와 동일
            alert("검색어를 넣어주세요.");
        }else{
            city.push($search_val);
            w_info();
        }
        $("#search_box").val("");  //set 방식
    }

    $(".search button").click(function(){
        search();
    });

    $(".search").keypress(function(event){
        //console.log(event);
        var $keyCode = event.keyCode;
        //console.log($keyCode);
        if($keyCode == 13){
            //console.log("엔터값 적용");
            search();
        }
    });

    //"현재 날씨 정보를 클릭시" 데이터 갱신되게 만듬
    $(".title").click(function(){
        location.reload();
    });




});

//api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
//api.openweathermap.org/data/2.5/weather?q=London&appid=7a69a1a267707ce60734f74ffc663e12
//7a69a1a267707ce60734f74ffc663e12