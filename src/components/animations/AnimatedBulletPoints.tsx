import { ScrollAnimation } from './ScrollAnimation';

interface AnimatedBulletPointsProps {
  items: string[];
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  bulletClassName?: string;
  textClassName?: string;
  delayTime?: number;
}

export function AnimatedBulletPoints({ 
  items, 
  delay = 0, 
  direction = 'up',
  className = 'space-y-4',
  bulletClassName = 'text-content-primary mr-4',
  textClassName = 'text-content-primary',
  delayTime = 0.25
}: AnimatedBulletPointsProps) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <ScrollAnimation 
          key={index} 
          delay={delay + (index * delayTime)} 
          direction={direction}
        >
          <li className="flex items-start text-left">
            <span className={bulletClassName}>•</span>
            <p className={textClassName}>{item}</p>
          </li>
        </ScrollAnimation>
      ))}
    </ul>
  );
}
