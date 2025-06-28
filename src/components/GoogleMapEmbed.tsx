import React from 'react';

interface GoogleMapEmbedProps {
  /**
   * Width of the map in pixels or percentage
   * @default '100%'
   */
  width?: string | number;
  /**
   * Height of the map in pixels or percentage
   * @default '450px'
   */
  height?: string | number;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Enable lazy loading of the iframe
   * @default true
   */
  lazyLoading?: boolean;
}

/**
 * GoogleMapEmbed component that displays an embedded Google Map using the direct embed URL
 */
const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  width = '100%',
  height = '450px',
  className = 'rounded-lg shadow-xl overflow-hidden',
  lazyLoading = true,
}) => {
  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.063690729208!2d147.13661941239997!3d-41.43783964960421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa70a72d183015f7%3A0x8fd252b1fb423c23!2sDill%20Pickle%20Club!5e0!3m2!1sen!2sau!4v1750934871020!5m2!1sen!2sau';

  return (
    <div className={`google-map-embed ${className}`} style={{ width: '100%', overflow: 'hidden' }}>
      <iframe
        title="Dill Pickle Club Location on Google Maps"
        width={width}
        height={height}
        style={{ border: 0 }}
        loading={lazyLoading ? 'lazy' : 'eager'}
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        allowFullScreen
        aria-label="Interactive map showing the location of Dill Pickle Club"
      />
    </div>
  );
};

export default GoogleMapEmbed;
