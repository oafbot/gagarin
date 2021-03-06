const TILE_DIMENSION = 32;
const SCREEN_WIDTH   = 25;
const SCREEN_HEIGHT  = 15;
const CENTER_X       = Math.floor(SCREEN_WIDTH/2);
const CENTER_Y       = Math.floor(SCREEN_HEIGHT/2);
const EMPTY_TILE     = 0;

/**
 * Map
 *
 */
function Map(){
    
    this.Rows;
    this.Cols;
    this.Data;
    this.FilePath = GAGARIN_ROMS+'/demo/map.tmx';
    this.Layers;
    this.TileSheetWidth;
    this.TileSheetHeight;
    this.X;
    this.Y;
    this.Background;
    this.Obstacles;
    this.Interactive;
    this.DataSet = Array();
    this.Xml;
    
   /**
    * Initialize 
    *
    */
    this.Initialize = function(){
        
        var xmlhttp;
        
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', this.FilePath, false);
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send();
        
        this.Xml = xmlhttp.responseXML;
        
        this.Layers = this.Xml.getElementsByTagName('layer');
        this.Rows = this.Layers[0].getAttribute('height');
        this.Cols = this.Layers[0].getAttribute('width');
        
        this.Objects = this.Xml.getElementsByTagName('object');
        
        for(var i = 0; i<this.Layers.length; i++){    
            if(this.Layers[i].getAttribute('name') == 'background')
                this.Background = this.Layers[i].getElementsByTagName('data')[0].childNodes[0].nodeValue.split(',');
            if(this.Layers[i].getAttribute('name') == 'collision')
                this.Obstacles = this.Layers[i].getElementsByTagName('data')[0].childNodes[0].nodeValue.split(',');
        }
        
        this.DataSet['Background'] = this.Background;
        this.DataSet['Obstacles']  = this.Obstacles;
        
        this.TileSheetWidth  = this.Xml.getElementsByTagName('image')[0].getAttribute('width')/TILE_DIMENSION;
        this.TileSheetHeight = this.Xml.getElementsByTagName('image')[0].getAttribute('height')/TILE_DIMENSION;
        
        this.TileSheet = new Image();
        this.TileSheet.src = GAGARIN_ROMS+'/demo/'+this.Xml.getElementsByTagName('image')[0].getAttribute('source');
        this.TileSheet.addEventListener('load', this.EventSheetLoaded, false);
        
    }
    
    this.EventSheetLoaded = function(){
        Game.LoadComplete();
    }
   
   
   /**
    * Render
    * Render the map
    */
    this.Render = function(x, y){
        for(var layer in this.DataSet ){
            this.Data = this.DataSet[layer];
            
            var i=0;
            for(var row=0; row<this.Rows; row++){
                for(var col=0; col<this.Cols; col++){
                    if(this.Data[i] != 0){                
                        var sourceX = Math.floor( (this.Data[i]-1) % this.TileSheetWidth ) * TILE_DIMENSION;
                        var sourceY = Math.floor( (this.Data[i]-1) / this.TileSheetWidth ) * TILE_DIMENSION; 
                    }
                    else{
                        var sourceX = EMPTY_TILE;
                        var sourceY = EMPTY_TILE;
                    }
                    this.OffsetX   = (col-x)*TILE_DIMENSION;
                    this.OffsetY   = (row-y)*TILE_DIMENSION;
                    
                    Context.drawImage(this.TileSheet, sourceX, sourceY, TILE_DIMENSION, TILE_DIMENSION, 
                        this.OffsetX, this.OffsetY, TILE_DIMENSION, TILE_DIMENSION);
                    i++;
                }
            }
        }
    }
   
   /**
    * CurrentPosition
    */
    this.CurrentPosition = function(){
        this.X = Map.X + Sprite.X;
        this.Y = Map.Y + Sprite.Y;
    }
    
   /**
    * Traverse
    */
    this.Traverse = function(d){
        var index = (( Map.Y + Sprite.Y ) * this.Cols) + ( Map.X + Sprite.X );
        switch(d){
            case 'LEFT':
                if(this.Obstacles[index-1] == EMPTY_TILE) return true;
                break;
            case 'RIGHT':
                if(this.Obstacles[index+1] == EMPTY_TILE) return true;
                break;
            case 'UP':
                if(this.Obstacles[index - Number(this.Cols)] == EMPTY_TILE) return true;
                break;
            case 'DOWN':
                if(this.Obstacles[index + Number(this.Cols)] == EMPTY_TILE) return true;
                break;
        }
        return false;
    }

}