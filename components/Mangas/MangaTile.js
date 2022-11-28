import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import css from "../../styles/components/MangaTile.module.css";

export default function MangaTile({ props }) {
	const [isMouseOver, setIsMouseOver] = useState(false);

	const onLoadHandler = () => {
		// событие после загрузки изображения
	};

	// const cutLongTitle = (title) => {
	//   if (title.length > 88) {
	//     console.log(title.slice(0, 85));
	//     return title.slice(0, 100);
	//   }
	//   return title;
	// };

	return (
		<Link href={`/mangas/${props._id}`}>
			<a
				className={css.manga_tile}
				onMouseOver={() => {
					setIsMouseOver(true);
				}}>
				<Image
					onLoad={onLoadHandler}
					src={props.cover}
					layout='responsive'
					alt='pic'
					width={500}
					height={700}
				/>

				<Flex
					position='absolute'
					left='0'
					bottom='0'
					zIndex='2'
					width='100%'
					px={{ base: "4px", sm: "8px" }}
					pb={{ base: "4px", sm: "6px" }}
					height={{ base: "50%", sm: "30%" }}
					bgGradient='linear(to-t, rgba(0,0,0,0.8), rgba(0,0,0,0))'>
					<Box
						mt='auto'
						maxHeight={{ base: "34px", sm: "48px" }}
						fontSize={{ base: "14px", sm: "18px" }}
						lineHeight='125%'
						overflowY='hidden'
            className={css.m_tile_title}
            >
						{props.title}
					</Box>
				</Flex>
			</a>
		</Link>
	);
}
