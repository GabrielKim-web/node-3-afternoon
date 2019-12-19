module.exports = {
   // we create a dbInstance that references req.app.get('db') so it saves us typing; a shortcut
   create: (req, res, next) => {
      const dbInstance = req.app.get('db');
      const {name, description, price, image_url} = req.body;
      dbInstance.create_product([name, description, price, image_url])
         .then( () => res.sendStatus(200))
         .catch( err => {
            res.status(500).send(`Dot your I's and cross your T's.`);
            console.log(err);
         });
   },
   getOne: (req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.read_product(req.params.id)
         .then( (product) => res.status(200).json(product))
         .catch( err => {
            res.status(500).send(`Dot your I's and cross your T's.`);
            console.log(err);
         });
   },
   getAll: (req, res, next) => {
      const dbInstance = req.app.get("db");
      dbInstance.read_products()
         //if we are sending a request, we do NOT sendStatus!
         .then( products => res.status(200).json(products))
         .catch( err => {
            res.status(500).send(`Dot your I's and cross your T's.`);
            console.log(err);
         });
   },
   update: (req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.update_product([req.params.id, req.query.desc])
         .then( () => res.sendStatus(200))
         .catch( err => {
            res.status(500).send(`Dot your I's and cross your T's.`);
            console.log(err);
         })
   },
   delete: (req, res, next) => {
      const dbInstance = req.app.get('db');
      dbInstance.delete_product(req.params.id)
         .then( () => res.sendStatus(200))
   }
}