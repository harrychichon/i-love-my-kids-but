import './Checkboxes.scss';
import React from 'react';

type CheckboxesProps = {
	array: string[];
	id: boolean;
	legend?: string;
	checked?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export default function Checkboxes({
	                                   array,
	                                   id,
	                                   legend,
	                                   checked,
	                                   onChange,
                                   }: CheckboxesProps) {
	return (
		<fieldset className="Checkboxes">
			{legend && <legend>{legend}</legend>}
			{array.map((item, index) => (
				<label key={index} className={item}>
					<input
						className="TypeCheckbox"
						id={id ? `${item}-${index}` : undefined}
						type="checkbox"
						value={item}
						checked={checked}
						onChange={onChange}
					/>
					{item.toUpperCase()}
				</label>
			))}
		</fieldset>
	);
}