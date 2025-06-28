import React, { useEffect } from 'react';

interface InstagramFeedProps {
  /**
   * Your LightWidget widget ID
   * You can get this from your LightWidget dashboard
   */
  widgetId: string;
  /**
   * Width of the widget
   * @default '100%'
   */
  width?: string | number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Title for the Instagram feed section
   */
  title?: string;
}

/**
 * InstagramFeed component that displays Instagram posts using LightWidget
 * You need to sign up at https://lightwidget.com/ to get a widget ID
 */
const InstagramFeed: React.FC<InstagramFeedProps> = ({
  widgetId,
  width = '100%',
  className = '',
  title = 'Follow us on Instagram',
}) => {
  useEffect(() => {
    // Load the LightWidget script
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={`instagram-feed ${className}`} style={{ width }}>
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8">
          {title}
        </h2>
      )}
      <iframe
        src={`//lightwidget.com/widgets/${widgetId}.html`}
        scrolling="no"
        allowTransparency
        style={{ width: '100%', border: 0, overflow: 'hidden' }}
        className="lightwidget-widget"
        title="Instagram Feed"
      />
    </div>
  );
};

export default InstagramFeed;
