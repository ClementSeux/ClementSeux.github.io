$(function($){
  
    //Find first parent of an element with class '.row'
    function getFirstRowParent (element) {
        console.log(element)
        if (element.hasClass('row')) {
            return element
        }
        return getFirstRowParent(element.parent())
    }

    function displayImage(e) {
        const link = $(e.target)
        const row = getFirstRowParent(link)
        const imageContainer = row.children('.show-image')
        imageContainer.css('display', 'block')
        imageContainer.children().removeClass('hidden')
    }

    //On clicking on a link, make th eimage appear
    $('a:not(.nav-link)').mouseenter((e) => {
        setTimeout(displayImage(e), 3000);
    })

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }


    function getStarCoordinate() {
        const margin = 0.1
        const x = getRandomInt(Math.floor(canvas.width * margin), Math.floor(canvas.width * (1 - margin)))
        const y = getRandomInt(Math.floor(canvas.height * margin), Math.floor(canvas.height * (1 - margin)))
        const starSize = Math.floor(window.devicePixelRatio * Math.random() * 2) + 1
        return [x, y, starSize]
    }  


    function getRandomColor(){
        const red = 230 + getRandomInt(0, 20)
        const green = 230 + getRandomInt(0, 20)
        const blue = 230 + getRandomInt(0, 20)
        return [red, green, blue]
    }


    function getRandomColorString(setOfColors){
        if (setOfColors.length > 3) {
            return 'rgba(' + setOfColors[0] + ',' + setOfColors[1] + ',' + setOfColors[2] + ',' + setOfColors[3] + ')'
        } else {
            return 'rgb(' + setOfColors[0] + ',' + setOfColors[1] + ',' + setOfColors[2] + ')'
        }
    }


            //Canvas-background management
    const canvas = document.getElementById('star-bg')
    const canvasSpeed = document.getElementById('star-speed-bg')
    const canvasSpeedJQ = $('#star-speed-bg')
    canvasSpeedJQ.css('z-index', '-3')
    canvasSpeedJQ.css('display', 'none')

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        const ctxSp = canvasSpeed.getContext('2d');
        // Set display size (css pixels).
        const xSize = window.innerWidth;
        const ySize = window.innerHeight

        canvas.style.width = xSize + "px";
        canvas.style.height = ySize + "px";
        canvasSpeed.style.width = xSize + "px";
        canvasSpeed.style.height = ySize + "px";

        // Set actual size in memory (scaled to account for extra pixel density).
        var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        canvas.width = Math.floor(xSize * scale);
        canvas.height = Math.floor(ySize * scale);
        canvasSpeed.width = Math.floor(xSize * scale);
        canvasSpeed.height = Math.floor(ySize * scale);

        // Normalize coordinate system to use CSS pixels.
        ctx.scale(scale, scale);
        ctxSp.scale(scale, scale);


        let starAtlas = []


        function generateAtlas() {
            //Generate a random list of stars
            starAtlas = []
            for (let i = 0; i< 40; i++) {
                starAtlas.push(getStarCoordinate())
            }
        }

        function emptyCanvas(context) {
            //empty the canvas
            context.fillStyle = getRandomColorString([0, 0, 0])  //set fill style to black
            context.rect(0,0, window.innerWidth, window.innerHeight)
            context.fill()
        }


        function drawStars(context) {     
            emptyCanvas(context)      
            //Draw the stars as dots
            for (let i = 0; i < starAtlas.length; i++) {
                //Get one star size and color
                const starSize = starAtlas[i][2]
                const starColor = getRandomColor()

                //draw the dot
                context.fillStyle = getRandomColorString(starColor)
                context.beginPath()
                context.moveTo(starAtlas[i][0], starAtlas[i][1])
                context.arc(starAtlas[i][0], starAtlas[i][1], starSize, 0, Math.PI * 2, true)
                context.fill()

                //draw the cross
                starColor.push(0.5) //add alpha 
                context.lineWidth = Math.floor(starSize / 4) + 1;
                context.strokeStyle = getRandomColorString(starColor); //generate new color string with alpha
                context.beginPath()
                context.moveTo(starAtlas[i][0], starAtlas[i][1] + starSize * 5)
                context.lineTo(starAtlas[i][0], starAtlas[i][1] - starSize * 5)
                context.moveTo(starAtlas[i][0] - starSize * 2 , starAtlas[i][1])
                context.lineTo(starAtlas[i][0] + starSize * 2 , starAtlas[i][1])
                //ctx.stroke()
            }   
        }


        function speedStars(context) {
            emptyCanvas(context)

            drawStars(context)

            //get center of window
            const center = [Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2)]
            console.log(center)
            console.log(starAtlas)
            for (let i = 0; i < starAtlas.length; i++) {
                //Get one star size and color
                const starSize = starAtlas[i][2]
                const starColor = getRandomColor()

                const ratio = 1
                //draw the dot
                context.lineWidth = starSize * 2;
                context.strokeStyle = getRandomColorString(starColor); 
                context.beginPath()
                context.moveTo(starAtlas[i][0], starAtlas[i][1]) //move to star coordinate
                context.lineTo(starAtlas[i][0] + ratio * (starAtlas[i][0] - center[0]), starAtlas[i][1] + ratio * (starAtlas[i][1] - center[1]))
                //ctx.lineTo(center[0], center[1])
                context.stroke()
            }
        }

        generateAtlas()
        drawStars(ctx)
        speedStars(ctxSp)
        $( window ).scroll(function() {
            canvasSpeedJQ.css( "display", "block" ).fadeOut( 2000, function() {
                
                speedStars(ctxSp)
              } );
            generateAtlas()
            drawStars(ctx)
          });

    }

})




    
