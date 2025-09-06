'use client';
import { useState } from 'react';

const FeatureList = ({ features }: { features: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 400; // Set your desired character limit

  // Calculate initial visible features and truncation status
  const calculateInitialFeatures = () => {
    let totalChars = 0;
    const visibleFeatures = [];
    let truncateIndex = -1;

    for (let i = 0; i < features.length; i++) {
      const featureLength = features[i].length;

      if (totalChars + featureLength > characterLimit) {
        // Calculate remaining characters
        const remaining = characterLimit - totalChars;
        if (remaining > 20) {
          // Only truncate if there's significant content
          visibleFeatures.push(features[i].slice(0, remaining) + '...');
          truncateIndex = i;
        }
        break;
      }

      visibleFeatures.push(features[i]);
      totalChars += featureLength;

      if (totalChars >= characterLimit) break;
    }

    return {
      visibleFeatures,
      hasMore: truncateIndex !== -1 || visibleFeatures.length < features.length,
    };
  };

  const { visibleFeatures, hasMore } = calculateInitialFeatures();

  return (
    <div className="space-y-4 text-sm">
      <h2 className="text-lg font-semibold">Key Features</h2>
      <ul className="list-disc space-y-2 pl-6">
        {(isExpanded ? features : visibleFeatures).map((feature, idx) => (
          <li key={idx} className="text-gray-600">
            {feature}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      )}
    </div>
  );
};
export default FeatureList;
