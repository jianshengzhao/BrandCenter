 ;(function(){

     var D = document,video,photo,
         G = 'getElementById',
         A = 'addEventListener',
         s = 'style'
         d = 'display',
         n = 'nodeName';

        // video 视频预览
        if(D[G]('video')){
            ;(function(){  
                video = D[G]('video');
                var P = D[G]('popBox'),//弹框
                    V = D[G]('vd'),//弹框video
                    C = D[G]('close'),//弹框close
                    R = D[G]('poster'),//弹框poster
                    T = D[G]('time'),               
                    a = 'target',
                    g = 'getAttribute';

                //点击跳出弹框，并播放 
                video[A]("click",function(e){
                    var className = e[a].className;
                  	if(className.indexOf('play') > -1){          
                    	var ds = e[a][g]('data-src'),
                            dp = e[a][g]('data-potser');
                            dt = e[a][g]('data-time')+' / '+e[a][g]('data-size');

                            R[s][d] = 'none';
                        	P[s][d] = 'block';
                        	V.src = ds;
                        	V.play();                                
                            R[s].backgroundImage = 'url('+dp+')';
                            T.innerText = dt;
                  	}
                })
                //close 按钮
                C[A]('click',function(){
                	P[s][d] = 'none';
                	V.src = "";
                })
                //视频暂停，显示封面
                V[A]('pause',function(){
                	R[s][d] = 'block';
                })
                //视频播放，隐藏封面
                V[A]('play',function(){
                    R[s][d] = 'none';
                })

            })()        
        }

        // slide 幻灯片
        if(D[G]('slider')){
            ;(function(){

                var slider = D[G]('slider'),
                    sliderLi = [],
                    navLl,
                    si = 1,
                    jj = 0,
                    puaseSlide;

                for(var i in slider.children){
                    var child = slider.children[i];                  
                    if(!child.className?false:child.className.indexOf('slider-li') > -1){
                        sliderLi.push(child);
                    }else if(child.className){
                        navLl = slider.children[i].children;                
                    }
                }
         
                // playslide = slideTime();
                //鼠标悬停，停止slide
                slider[A]('mouseenter',function(){          
                    clearTimeout(puaseSlide);
                })
                //鼠标离开，唤起slide
                slider[A]('mouseleave',function(){
                    slideTime();
                })
                slideTime = function (){
                    puaseSlide = setTimeout(function(){
                        changeS(sliderLi,si,jj);
                        if(si >= (sliderLi.length-1)){
                            si = 0;
                            jj=(sliderLi.length-1); 
                        }else{
                            si++;
                            jj=si-1;
                        }              
                        slideTime();  
                    },3000)
                } 
                if(window.name != ""){
                    slideTime();
                }  
                window.name = "";      

                function changeS(arr,j,jj){
                                       
                    for(var i in arr){
                        arr[i].classList.remove('slider-acitve'); 
                        arr[i].classList.remove('slider-leave');                         
                        navLl[i].classList.remove('active');
                    }
                    arr[j].classList.add('slider-acitve');
                    arr[jj].classList.add('slider-leave');
                    navLl[j].classList.add('active');
                }   

            })()
        }

        // year suspend 年份分类标签
        if(D[G]('year')){
            ;(function(){
                var Y = D[G]('year'),           
                    C = Y.children,
                    U,N;
               
                for(var i in C){
                    C[i][n] =='UL'?U = C[i]:C[i][n] =='SPAN'?N = C[i]:"";
                }

                Y[A]('mouseenter',function(){ 
                    U[s][d] = "block";
                })

                Y[A]('mouseleave',function(){
                    U[s][d] = "none";
                })

                U[A]('click',function(e){                
                    N.innerText = e.target.innerText;
                    U[s][d] = "none";
                })

            })()
        }

        //classify 分类标签
        if(D[G]('classify')){
            ;(function(){
                var C = D[G]('classify');

                C[A]('click',function(e){
                    init();
                    if(e.target[n] == 'LI'){
                        e.target.classList.add('active');
                    }
                })

                function init(){
                    for(var i in C.children){
                        var c = C.children[i];                
                        if(c.className){
                           c.classList.remove('active');
                           break;
                        }

                    }
                }
            })()        
        }

        //photo 图片预览
        if(D[G]('photo')){
            ;(function(){
                photo = D[G]('photo');
                var C = D[G]('close'),
                    P = D[G]('popBox'),
                    B = D[G]('bigImg'),
                    a = 'target';

                photo[A]('click',function(e){
                    var nodeName = e[a][n];
                    if(nodeName == 'IMG'){               
                        var src = e[a].src;
                        B.src = src;
                        P[s][d] = 'block';
                    }
                })

                C[A]('click',function(){
                    P[s][d] = 'none';
                })

            })()
        }

        //scroll 滚动加载
        if(window.needscroll){
            ;(function(){
                var visualheight = D.children[0].clientHeight,//可视高度,去除浏览器状态栏的
                scorllMaxTop = D.body.clientHeight - visualheight,//滑块最大top
                leaveBottom = 200,//距底部多少加载
                l = D[G]('load'),
                ajaxstatus = true;
         
                D[A]('scroll',function(e){

                    var scrollY = window.scrollY;
                    
                    if((scrollY+leaveBottom) > scorllMaxTop){
                    //判断是否到底部
                        if(ajaxstatus){
                        //限制多次触发请求
                            ajaxstatus = false;
                            l[s][d] = 'block';//显示loading
                            var frag = D.createDocumentFragment();
                         // $.ajax(data,function(arr){                           
                            setTimeout(function(){//模拟请求数据，延时加载  

                                if(video){
                                    //是否为视频中心   
                                    var arr = [{'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'},
                                               {'img':'https://img.alicdn.com/tps/TB1EH2TPXXXXXXmXFXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区','time':'45:00','size':'125Mb','videoUrl':'https://cloud.video.taobao.com/play/u/2039410823/p/1/e/6/t/1/47069268.mp4'}];
                                               //模拟得到的数据，每次吐12条数据（交互要求）                
                                    for(var i in arr){
                                        var li = D.createElement('li');
                                        li.innerHTML = "<img src='"+arr[i].img+"'>"
                                                     + "<p>"+arr[i].title+"<span>下载</span></p>"
                                                     + "<div class='gray'>"
                                                     + "<p class='time'>"+arr[i].time+" / "+arr[i].size+"</p>"
                                                     + "<div class='play' data-src='"+arr[i].videoUrl+"' data-potser='"+arr[i].img+"' data-time='"+arr[i].time+"' data-size='"+arr[i].size+"'></div>"
                                                     + "</div>";
                                        frag.appendChild(li);
                                    }
                                    video.appendChild(frag);
                                }

                                if(photo){
                                    //是否为品牌图集   
                                    var arr = [{'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'},
                                           {'img':'https://img.alicdn.com/tps/TB1ONroPXXXXXcWapXXXXXXXXXX-270-180.png','title':'菜鸟驿站-社区'}];
                                           //模拟得到的数据，每次吐12条数据（交互要求） 
                                    for(var i in arr){
                                        var li = D.createElement('li');
                                        li.innerHTML = "<img src='"+arr[i].img+"' >"
                                                     + "<p>"+arr[i].title+"<span>下载</span></p>";
                                        frag.appendChild(li);
                                    }                                
                                    photo.appendChild(frag); 
                                }

                                ajaxstatus = true;//请求数据完成并完成渲染，解除限制                           
                                scorllMaxTop = D.body.clientHeight - visualheight;//重新计算滑块最大top
                                l[s][d] = 'none';//隐藏loading

                            },1000)
                         // })
                        }
                    }
                })

            })()
        }
  
})()
