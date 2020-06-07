import 'reflect-metadata';

import { buildServiceDefinition } from '@apollographql/apollo-tools';
import fs from 'fs';
import { printSchema } from 'graphql/utilities';
import path from 'path';

import { AppModule } from './modules/app';

const GENERATED_FOLDER = path.join(__dirname, './__generated__');
const GENERATED_FILE = 'schema.gql';

(function () {
	const { schema } = buildServiceDefinition([AppModule]);
	if (schema) {
		try {
			const schemaString = printSchema(schema);

			if (!fs.existsSync(GENERATED_FOLDER)) {
				fs.mkdirSync(GENERATED_FOLDER);
			}

			fs.writeFileSync(path.join(GENERATED_FOLDER, GENERATED_FILE), schemaString);
		} catch (error) {
			console.error(error);
		}
	} else {
		console.log('No schema to print');
	}
})();
