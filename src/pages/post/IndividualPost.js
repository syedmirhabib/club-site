import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import { format } from 'date-fns';

import { Container, Heading } from 'components';
import { link, logoColored } from 'images';
import Share from './Share';

export default function Card({ ind }) {
	const { state } = useLocation();
	const history = useHistory();

	useEffect(() => {
		if (state === undefined || state === null) {
			history.push('/posts');
		}
	}, [state, history]);

	const download = e => {
		fetch(e.target.href, {
			method: 'GET',
			headers: {}
		})
			.then(response => {
				response.arrayBuffer().then(function (buffer) {
					const url = window.URL.createObjectURL(new Blob([buffer]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'image.png'); //or any other extension
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<ContainerCustom key={ind}>
			<img className='logo' src={logoColored} alt='logo'></img>
			<Top>
				<Left>
					<Heading style={{ textAlign: 'left' }} gradient>
						{state.title}&nbsp;
					</Heading>
					<Details>
						<p>
							Posted on: {format(new Date(state.createdAt), 'h:m,do LLLL')} by @{state.author}
						</p>
					</Details>
				</Left>
			</Top>
			<Center>{state.content}</Center>
			<Bottom>
				{state.attachment && (
					<Button href={state.attachment} download onClick={e => download(e)}>
						<img src={link} alt={link}></img>
						Download Attachment
					</Button>
				)}
				<Share value={state} />
			</Bottom>
		</ContainerCustom>
	);
}

const ContainerCustom = styled(Container)`
	margin-top: 10em;
	position: relative;

	.logo {
		width: 8rem;
		position: absolute;
		top: -8em;

		@media only screen and (max-width: 600px) {
			width: 7rem;
		}
	}
`;

const Top = styled.div`
	border-bottom: 2px solid #c2c2c2;
	padding-bottom: 1em;
`;

const Left = styled.div`
	text-align: left;
`;

const Details = styled.div`
	p {
		font-size: 1.2rem;
	}
`;

const Center = styled.div`
	font-size: 1.5rem;
	padding: 2em 0;
`;
const Bottom = styled.div`
	margin-top: 1em;
	display: flex;
	gap: 2em;
	align-items: center;
	img {
		display: inline-block;
		width: 3rem;
		cursor: pointer;
	}
`;
const Button = styled.a`
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1em 2em;
	border-radius: 2em;
	cursor: pointer;
	background-color: ${p => `${p.theme.primary}20`};
	border: ${p => `2px solid ${p.theme.primary}`};
	color: ${p => p.theme.black};
	font-weight: 600;
	font-size: 1.2rem;
	font-family: inherit;

	img {
		display: inline-block;
		width: 2rem;
		margin-right: 1em;
	}
`;
