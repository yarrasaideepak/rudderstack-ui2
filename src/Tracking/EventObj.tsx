import { object } from "yup";

type eventObj = {

    name: String,
    description: String,
    rules: {
        $schema: String,
        type: String,
        properties: Map<String,Object>,
        required: String[]
    }
	
};
  
  export default eventObj;