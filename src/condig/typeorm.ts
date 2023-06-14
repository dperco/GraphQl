import * as path from 'path';
import { DataSource } from 'typeorm';
// let entities = ['dist/entities/**/*.js'];
// if (path.extname(__filename) === '.ts') {
//   entities = ['src/entities/**/*.ts'];
// }
const datasource = new DataSource({
  type: 'sqlite',
  database: 'graphql.db3',
  entities:[path.join(__dirname,'../entity/**/**.ts')],
  synchronize: true,
});
export default datasource; 