import { Mongo as Repository } from "./mongo_repository";

export namespace Mongo {
  export const storeDocument = (nameDocument: string, schema: any, data: any) => {
    const model = Repository.model(nameDocument, schema)

    new model(data).save()
    .then((result: any) => {
      console.log(result);
    }).catch((error: any ) => {
      console.log(error);
    })
  }
}