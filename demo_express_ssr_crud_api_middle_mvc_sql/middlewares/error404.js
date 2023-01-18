const manage404 = function (req,res,next){
	res.status(404).json({msj:'Error! 404. Ruta no encontrada :)'});
};

module.exports = manage404;