//Este es si se usa try and catch
/*export const errorHandler = (err:any, req:any, res:any, next:any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};*/


//este si se usa el envolvente

export const errorHandler = (err: any, req: any, res: any, next: any) => {
    console.error(err.stack); //imprime errores en la consola
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};


