$(document).ready(function() {
if(!$('#myCanvas').tagcanvas({
    textColour: '#ff0000',
    outlineColour: '#ff00ff',
    reverse: true,
    depth: 0.8,
    maxSpeed: 0.05
},'tags')) {
    // something went wrong, hide the canvas container
    $('#myCanvasContainer').hide();
}
});