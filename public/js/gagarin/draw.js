function Draw(){

    this.RoundedRectangle = function roundRect(x, y, width, height, radius, fill, stroke){
        if(typeof stroke == "undefined")
            stroke = false;
        if(typeof radius === "undefined")
            radius = 5;

        Context.beginPath();
        Context.moveTo(x + radius, y);
        Context.lineTo(x + width - radius, y);
        Context.quadraticCurveTo(x + width, y, x + width, y + radius);
        Context.lineTo(x + width, y + height - radius);
        Context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        Context.lineTo(x + radius, y + height);
        Context.quadraticCurveTo(x, y + height, x, y + height - radius);
        Context.lineTo(x, y + radius);
        Context.quadraticCurveTo(x, y, x + radius, y);
        Context.closePath();
        if(stroke)
            Context.stroke();
        if(fill)
            Context.fill();
    }

}