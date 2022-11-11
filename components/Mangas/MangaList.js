import manga from "../../styles/components/MangaList.module.css";
import Image from "next/image";
import { Flex, Box, Tag, HStack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
export default function MangaList({ data }) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [galleryExtended, setGalleryExtended] = useState(false);
	const onLoadHandler = () => {
		setIsLoaded(true);
	};

	return (
		<Skeleton isLoaded={isLoaded}>
			<Flex className={manga.list}>
				<Link href={`/mangas/${data._id}`}>
					<a>
						<Flex
							justify='center'
							align='center'
							className={manga.image_wrap}>
							{/* onMouseEnter= */}
							{() => {
								setGalleryExtended(true);
							}}
							{Array.of(1, 1, 1).map((_, i) => {
								return (
									<Box
										key={i + 1}
										className={`${manga.image}`}>
										<Image
											onLoad={onLoadHandler}
											src={`/manga_cover/cover_${_}.jpg`}
											alt='pic'
											layout='intrinsic'
											width={160}
											height={200}
										/>
									</Box>
								);
							})}
							{/* <Box>
						<Image
							onLoad={onLoadHandler}
							src='/manga_cover/cover_6.jpg'
							alt='pic'
							layout='intrinsic'
							width={160}
							height={200}
						/>
					</Box> */}
						</Flex>
					</a>
				</Link>

				<Flex
					direction='column'
					className={manga.info}>
					<Flex
						w='100%'
						mb='16px'>
						<Box
							fontSize='18px'
							minW='100px'>
							Название
						</Box>
						<Link href={`/mangas/${data._id}`}>
							<a>
								<Box
									fontSize='18px'
									w='100%'>
									{data.title}
								</Box>
							</a>
						</Link>
					</Flex>
					<Flex mb='8px'>
						<Box minW='100px'>Серия</Box>
						<Box w='100%'>{data.series}</Box>
					</Flex>
					<Flex mb='10px'>
						<Box minW='100px'>Автор</Box>
						<Box w='100%'>{data.artist}</Box>
					</Flex>

					<Flex>
						<Box
							minW='100px'
							verticalAlign='center'>
							Теги:
						</Box>
						<Flex
							w='100%'
							flexWrap='wrap'>
							{data.tags.map((tag, i) => {
								return (
									<Tag
										key={i + 1}
										variant='solid'
										colorScheme='dark'
										margin='0 3px 3px 0'>
										{tag}
									</Tag>
								);
							})}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Skeleton>
	);
}
