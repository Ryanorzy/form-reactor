import React from 'react'
import {Formik, FormikHelpers, Form} from 'formik';
import { TextInput, NumberInput } from '../Fields/Input';
import { Select } from '../Fields/Select';
import { SubmitButton } from '../Fields/Submit';
import { TopLabel } from '../Fields/Label';
import styled from 'styled-components';
import { TwoColumnRow } from '../Layout/Row';
import { WP_Data, FetchResponseSuccess, FetchResponseFailure, createWPFetch } from '../Misc/wpData';
import { Textarea } from '../Fields/Textarea';

interface DemoFormState{
	name: string;
	age: number|"";
	sex: "male"|"female"|"other"|null;
	gender: string;
	weapon: {
		type: string;
		damage: number|"";		
	};
	magic: "fire"|"ice"|"thunder"|"bio"|"cure"|null;
	story: string;
}
const initialValues: DemoFormState ={
	name:"",
	age:"",
	sex:null,
	gender:"",
	weapon:{
		type:"",
		damage:"",
	},
	magic:null,
	story: "",

}

interface DemoFormProps{
	wp: WP_Data;
	instance:{
		
	}
}

interface SubmitResponse extends FetchResponseSuccess {
	data: {
		url: string;
	}
}

export const DemoForm = (props:DemoFormProps) => {

	//fetching from backend (boiler plage)
	const wpFetch = createWPFetch(props.wp.apiUrl);

	//everything happen after submit would be within handlesubmit function
	const handleSubmit = async (values:DemoFormState, form:
		FormikHelpers<DemoFormState>)=>{
			console.log(values);
			const response = await wpFetch<SubmitResponse|FetchResponseFailure>(
				"submit-character", values
			);
			
			if (!response.success){
				console.log(response.error);
			}else{
				window.location.href = response.data.url;
				//add code here to do things
			}

			form.setSubmitting(false);
	}
	return (
		<Formik<DemoFormState>
			initialValues={initialValues}
			validationSchema={null}
			onSubmit={handleSubmit}
		>
			{()=>(
				<Form>
					<TopLabel label="Name">
						<TextInput name="name" placeholder="Click to start typing"/>
					</TopLabel>
										
					<TopLabel label="Age">
						<NumberInput name="age" placeholder="Click to start typing"/>
					</TopLabel>
					
					<TopLabel label="Sex">
						<Select 
							name="sex"
							options={[
								{value:"male"  ,label:"Male"  },
								{value:"female",label:"Female"},
								{value:"other" ,label:"Other" },
							]} 
							placeholder="Click to select biological sex"
						/>
					</TopLabel>
					
					<TopLabel label="Gender">
						<TextInput name="gender" placeholder="Click to start typing"/>,
					</TopLabel>

					<TwoColumnRow>
						<TopLabel label="Weapom Type">
							<TextInput name="weapon.type"     placeholder="Click to start typing"/>
						</TopLabel>

						<TopLabel label="Weapon Damage">
							<NumberInput name="weapon.damage" placeholder="Click to start typing"/>
						</TopLabel>
					</TwoColumnRow>

					<TopLabel label="Magic Affinity">
						<Select 
							name="magic"
							options={[
								{value:"fire"   ,label:"Fire"    },
								{value:"ice"    ,label:"Ice"     },
								{value:"thunder",label:"Thunder" },
								{value:"bio"    ,label:"Bio"     },
								{value:"cure"   ,label:"Cure"    },
							]}
							placeholder="Click to select your magic affinity"
						/>
					</TopLabel>

					{/* <TopLabel label="Background Story">
							<Textarea name="story" placeholder="Click to start typing"/>
					</TopLabel>
					 */}
					<SubmitButton name="submit" />
				</Form>
			)}


		</Formik>

	);
}
