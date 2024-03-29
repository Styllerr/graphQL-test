import { makeSchema } from "nexus";
import { join } from "path";

import * as types from './qraphql/index'

export const schema = makeSchema({
    types,
    outputs: {
        schema: join(process.cwd(), "scema.graphql"),
        typegen: join(process.cwd(), "nexus-typegen.ts")
    }
})
