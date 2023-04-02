import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

import SideDrawer from "../../components/Reader/SideDrawer";
import ReaderAlt from "../../components/Reader/ReaderAlt";
import ReaderDef from "../../components/Reader/ReaderDef";
import { LINK } from "../../libs/API_URL.js";

export default function Reader() {
	const [mangaPages, setMangaPages] = useState();
	const [mangaTitle, setMangaTitle] = useState();
	const [quality, setQuality] = useState(50);
	const [showMap, setShowMap] = useState(false);
	const [readerAltMode, setReaderAltMode] = useState(false);
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const onLoadHander = async () => {
		try {
			const res = await fetch(`${LINK}/manga-dynamic`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: router.query.id }),
			});

			const data = await res.json();
			setMangaPages(data?.pages);
			setMangaTitle(data?.series);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!router.isReady) return;
		onLoadHander();
	}, [router.isReady]);

	return (
		<>
			<ReaderDef
				showMap={showMap}
				id={router.query.id}
				quality={quality}
				mangaTitle={mangaTitle}
				readerAltMode={readerAltMode}
				router={router}
				mangaPages={mangaPages}
				btnRef={btnRef}
				onOpen={onOpen}
			/>

			<ReaderAlt
				showMap={showMap}
				quality={quality}
				mangaTitle={mangaTitle}
				id={router.query.id}
				readerAltMode={readerAltMode}
				mangaPages={mangaPages}
				btnRef={btnRef}
				onOpen={onOpen}
			/>

			<SideDrawer
				showMap={showMap}
				quality={quality}
				readerAltMode={readerAltMode}
				isOpen={isOpen}
				onClose={onClose}
				btnRef={btnRef}
				setReaderAltMode={() => {
					setReaderAltMode(!readerAltMode);
				}}
				setQuality={(val) => {
					setQuality(val);
				}}
				setShowMap={(val) => {
					setShowMap(val);
				}}
			/>
		</>
	);
}
