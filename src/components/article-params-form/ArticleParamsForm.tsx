import {
	FormEvent,
	FunctionComponent,
	ReactElement,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm: FunctionComponent<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}): ReactElement<ArticleParamsFormProps> => {
	const [isOpen, setIsOpen] = useState<boolean>(false),
		[currentArticleState, setCurrentArticleState] =
			useState<ArticleStateType>(articleState),
		rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleSelectedOptionChange = (
		key: keyof ArticleStateType,
		option: OptionType
	) => {
		setCurrentArticleState({
			...currentArticleState,
			[key]: option,
		});
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(currentArticleState);
	};

	const handleFormReset = () => {
		setCurrentArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx([
					styles.container,
					{ [styles.container_open]: isOpen },
				])}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={currentArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleSelectedOptionChange('fontFamilyOption', option)
						}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={currentArticleState.fontSizeOption}
						title='размер шрифта'
						onChange={(option) =>
							handleSelectedOptionChange('fontSizeOption', option)
						}
					/>
					<Select
						title='цвет шрифта'
						selected={currentArticleState.fontColor}
						options={fontColors}
						onChange={(option) =>
							handleSelectedOptionChange('fontColor', option)
						}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={currentArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleSelectedOptionChange('backgroundColor', option)
						}
					/>
					<Select
						title='ширина контента'
						selected={currentArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleSelectedOptionChange('contentWidth', option)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
