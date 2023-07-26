import React, { useRef, useEffect, useState, ImgHTMLAttributes } from 'react'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string,
    id: string,
    onLazyLoad?: (node: HTMLImageElement) => void,
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
type Props = LazyImageProps & ImageNative;

const LazyImage = ({src, id, onLazyLoad, ...ImgProps}: Props): JSX.Element => {

    const node = useRef<HTMLImageElement>(null);
    const [currentSrc, setCurrentSrc] = useState('https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background.jpg')

    useEffect(()=>{
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    setCurrentSrc(src);
                    onLazyLoad && onLazyLoad(entry.target as HTMLImageElement)
                    observer.unobserve(entry.target)
                }
            });
        });

        node.current && observer.observe(node.current)

        return() => {
            observer.disconnect()
        }
    },[src]);



    return (
        <div>
            <img
                id={id}
                ref={node}
                src={currentSrc}
                {...ImgProps}
            />
        </div>
    )
}

export default LazyImage