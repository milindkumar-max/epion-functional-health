import React, { useState } from 'react';
import { Sparkles, RefreshCw, Download, Image as ImageIcon, CheckCircle2, AlertCircle, Edit3, Sliders, Upload, X } from 'lucide-react';

export const VisualStudio: React.FC = () => {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [prompt, setPrompt] = useState('Photorealistic editorial still life of nutrient-dense prebiotic whole foods on warm travertine stone with soft botanical daylight');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [editSourceImage, setEditSourceImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modelUsedNotice, setModelUsedNotice] = useState<string>('');

  const sampleCreatePrompts = [
    'Photorealistic editorial still life of nutrient-dense whole foods on warm travertine stone with soft botanical daylight',
    'Botanical cross-section of chicory root, dandelion greens, and prebiotic inulin fibers in clinical studio lighting',
    'High-resolution microscopic illustration of intestinal epithelial tight junctions and commensal bifidobacteria ecology',
    'Cellular diagram of inner mitochondrial membrane, cytochrome c oxidase, and ATP synthase rotary motor',
  ];

  const sampleEditPrompts = [
    'Add fresh heirloom turmeric rhizomes and organic ginger root next to the bowl',
    'Enhance cellular mitochondrial glow with warm amber bioluminescent particles',
    'Add clinical glass specimen slide with green chlorophyll botanical extract in background',
    'Transform lighting to calm warm golden morning sunlight on travertine surface',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditSourceImage(reader.result as string);
        setMode('edit');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateOrEdit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage('');
    setModelUsedNotice('');

    try {
      const payload: any = {
        prompt,
        aspectRatio,
        imageSize,
      };

      if (mode === 'edit' && editSourceImage) {
        payload.base64Image = editSourceImage;
      }

      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Image generation service temporarily unavailable.');
      }

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        setModelUsedNotice(data.modelUsed || 'gemini-nano-banana-2.1');
      } else {
        throw new Error('No visual data returned.');
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Image generation requires configured Gemini model access.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseAsEditSource = () => {
    if (imageUrl) {
      setEditSourceImage(imageUrl);
      setMode('edit');
      setPrompt('Add fresh heirloom herbs and emphasize natural warm sunlight');
    }
  };

  return (
    <div className="bg-white border border-[#DCD5C9] p-6 sm:p-9 shadow-sm space-y-7">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#63716A]">
            <Sparkles className="w-4 h-4 text-[#163324]" />
            <span className="font-bold text-[#163324] uppercase">AI Scientific Image Creation & Editing Studio</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#163324] mt-1">
            Multimodal Visual Studio · gemini-nano-banana-2.1
          </h3>
          <p className="text-xs text-[#525E58] mt-0.5">
            Create brand-new clinical botanical imagery or edit existing scientific assets using natural language prompts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono px-2.5 py-1 bg-[#163324] text-[#FAF8F5] border border-[#274433] font-bold">
            Model: gemini-nano-banana-2.1
          </span>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E2D8] pb-3 text-xs font-mono">
        <button
          onClick={() => setMode('create')}
          className={`px-4 py-2 font-bold transition-colors ${
            mode === 'create'
              ? 'bg-[#163324] text-[#FAF8F5]'
              : 'bg-[#F4F1EA] text-[#4E5B54] hover:bg-[#EAE5DC]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            Create From Text Prompt
          </span>
        </button>
        <button
          onClick={() => setMode('edit')}
          className={`px-4 py-2 font-bold transition-colors ${
            mode === 'edit'
              ? 'bg-[#163324] text-[#FAF8F5]'
              : 'bg-[#F4F1EA] text-[#4E5B54] hover:bg-[#EAE5DC]'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" />
            Edit Existing / Reference Image
          </span>
        </button>
      </div>

      {/* Mode = Edit: Upload or Reference Preview */}
      {mode === 'edit' && (
        <div className="p-4 bg-[#FAF8F5] border border-[#E8E2D8] space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#163324] uppercase text-[11px]">
              Reference Image to Edit:
            </span>
            {editSourceImage && (
              <button
                onClick={() => setEditSourceImage(null)}
                className="text-[10px] text-[#A24438] hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear Reference
              </button>
            )}
          </div>

          {editSourceImage ? (
            <div className="flex items-center gap-4">
              <img
                src={editSourceImage}
                alt="Edit Reference"
                className="w-24 h-24 object-cover border border-[#D5D0C6]"
              />
              <div className="space-y-1 text-xs">
                <span className="text-[#163324] font-bold block">Reference Loaded</span>
                <p className="text-[#63716A]">
                  Type instructions below describing what additions, lighting changes, or anatomical alterations to perform.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-[#D5D0C6] text-center space-y-2">
              <Upload className="w-5 h-5 mx-auto text-[#63716A]" />
              <p className="text-[#63716A]">Upload an image to edit with gemini-nano-banana-2.1</p>
              <label className="inline-block px-3 py-1.5 bg-[#163324] text-[#FAF8F5] text-xs cursor-pointer hover:bg-[#204532]">
                <span>Choose Image File</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          )}
        </div>
      )}

      {/* Prompt Form */}
      <form onSubmit={handleGenerateOrEdit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase font-bold text-[#163324] block">
            {mode === 'create' ? 'Prompt (Text to Image):' : 'Editing Instructions:'}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode === 'create'
                  ? 'Describe whole food botany, cellular organelles, or biochemistry...'
                  : 'Specify edits, e.g., "Add fresh kale leaves and soften background lighting"...'
              }
              className="flex-1 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DCD5C9] text-xs font-mono text-[#222725] focus:outline-none focus:border-[#163324]"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim() || (mode === 'edit' && !editSourceImage)}
              className="px-6 py-2.5 bg-[#163324] hover:bg-[#204532] disabled:opacity-40 text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#86C19D]" />
                  <span>{mode === 'create' ? 'Generate Image' : 'Apply Edits'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Configurations: Aspect Ratio & Image Size */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[#63716A] text-[11px]">Aspect Ratio:</span>
              {['1:1', '16:9', '4:3', '3:4'].map((ar) => (
                <button
                  key={ar}
                  type="button"
                  onClick={() => setAspectRatio(ar)}
                  className={`px-2 py-0.5 border text-[11px] ${
                    aspectRatio === ar
                      ? 'bg-[#163324] text-[#FAF8F5] border-[#163324]'
                      : 'bg-white text-[#46504A] border-[#DCD5C9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {ar}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#63716A] text-[11px]">Resolution:</span>
              {['1K', '2K'].map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => setImageSize(res)}
                  className={`px-2 py-0.5 border text-[11px] ${
                    imageSize === res
                      ? 'bg-[#163324] text-[#FAF8F5] border-[#163324]'
                      : 'bg-white text-[#46504A] border-[#DCD5C9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#63716A]">Presets:</span>
            {(mode === 'create' ? sampleCreatePrompts : sampleEditPrompts).slice(0, 2).map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPrompt(p)}
                className="px-2 py-0.5 bg-[#FAF8F5] text-[#163324] border border-[#E0D9CD] hover:border-[#163324] text-[10px] truncate max-w-[130px]"
              >
                Preset {i + 1}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3 bg-[#FAF2F2] border border-[#E8C4C4] text-[#9A2D2D] text-xs font-mono flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Visual Result Display */}
      {imageUrl && (
        <div className="space-y-3 pt-3 border-t border-[#E8E2D8] animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B7A57]"></span>
              <span className="font-bold text-[#163324] uppercase">Generated Scientific Visual</span>
              {modelUsedNotice && (
                <span className="text-[10px] text-[#687C71]">({modelUsedNotice})</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleUseAsEditSource}
                className="px-3 py-1 bg-[#FAF8F5] text-[#163324] border border-[#D5D0C6] hover:bg-[#F5F2EB] text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit This Image</span>
              </button>

              <a
                href={imageUrl}
                download="epion-gemini-visual.png"
                className="px-3 py-1 bg-[#163324] text-[#FAF8F5] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#204532]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          <div className="border border-[#DCD5C9] overflow-hidden bg-[#101E17] flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Generated Biological Artwork"
              className="max-h-[500px] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
};
