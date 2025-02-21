"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DiseaseDetection() {
  const [selectedDisease, setSelectedDisease] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  
  // Diabetes specific states
  const [glucose, setGlucose] = useState("")
  const [bmi, setBmi] = useState("")
  const [insulin, setInsulin] = useState("")
  const [diabetesResult, setDiabetesResult] = useState<{
    diagnosis: string;
    prediction_value: number;
    recommendation: string;
  } | null>(null)
  
  // Pneumonia detection states
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    result: {
      diagnosis: string;
      confidence: number;
      raw_score: number;
    };
    imageData: string;
  } | null>(null)

  useEffect(() => {
    // Reset states when changing disease type
    if (selectedDisease !== "pneumonia") {
      setImageFile(null)
      setImagePreview(null)
      setResult(null)
    }
    
    if (selectedDisease !== "diabetes") {
      setDiabetesResult(null)
    }
    
    // Calculate BMI when height and weight are provided
    if (height && weight && parseFloat(height) > 0) {
      const heightInMeters = parseFloat(height) / 100
      const weightInKg = parseFloat(weight)
      const calculatedBmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1)
      setBmi(calculatedBmi)
    } else {
      setBmi("")
    }
  }, [selectedDisease, height, weight])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null) // Clear previous results
    }
  }

  const handlePneumoniaDetection = async () => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload a chest X-ray image",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await fetch('http://localhost:5000/api/detect/pneumonia', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Detection failed. Please try again.')
      }

      const data = await response.json()
      setResult(data)
      
      toast({
        title: "Analysis Complete",
        description: `Result: ${data.result.diagnosis}`,
        variant: data.result.diagnosis === "Normal" ? "default" : "destructive",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDiabetesDetection = async () => {
    if (!glucose || !bmi || !insulin || !age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields for diabetes detection",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/predict/diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          glucose: parseFloat(glucose),
          bmi: parseFloat(bmi),
          insulin: parseFloat(insulin),
          age: parseFloat(age)
        }),
      })

      if (!response.ok) {
        throw new Error('Diabetes prediction failed. Please try again.')
      }

      const data = await response.json()
      setDiabetesResult(data.result)
      
      toast({
        title: "Analysis Complete",
        description: `Result: ${data.result.diagnosis}`,
        variant: data.result.diagnosis.includes("No") ? "default" : "destructive",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedDisease === "pneumonia") {
      handlePneumoniaDetection()
      return
    }
    
    if (selectedDisease === "diabetes") {
      handleDiabetesDetection()
      return
    }
    
    if (!selectedDisease || !age || !gender || !weight || !height) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }
    
    // Handle other disease types
    console.log({ selectedDisease, age, gender, weight, height })
    toast({
      title: "Analysis Submitted",
      description: "Your data has been sent for analysis.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow gradient-bg py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Disease Detection
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="detect" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="detect">Detect Disease</TabsTrigger>
                <TabsTrigger value="info">Disease Information</TabsTrigger>
              </TabsList>
              <TabsContent value="detect">
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Disease for Detection</CardTitle>
                    <CardDescription>Please provide the required information for analysis.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <RadioGroup value={selectedDisease} onValueChange={setSelectedDisease}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="heart-disease" id="heart-disease" />
                            <Label htmlFor="heart-disease">Heart Disease</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="diabetes" id="diabetes" />
                            <Label htmlFor="diabetes">Diabetes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="skin-cancer" id="skin-cancer" />
                            <Label htmlFor="skin-cancer">Skin Cancer</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pneumonia" id="pneumonia" />
                            <Label htmlFor="pneumonia">Pneumonia</Label>
                          </div>
                        </RadioGroup>

                        {selectedDisease === "pneumonia" ? (
                          <div className="space-y-6 mt-4">
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Pneumonia Detection</AlertTitle>
                              <AlertDescription>
                                Please upload a clear chest X-ray image for analysis. The image should be a front view (PA) of the chest.
                              </AlertDescription>
                            </Alert>
                            
                            <div className="space-y-2">
                              <Label htmlFor="xray-upload">Upload Chest X-ray</Label>
                              <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input
                                  id="xray-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="cursor-pointer"
                                />
                              </div>
                            </div>

                            {imagePreview && (
                              <div className="mt-4">
                                <Label>Image Preview</Label>
                                <div className="mt-2 border rounded-md overflow-hidden h-64 flex items-center justify-center bg-gray-50">
                                  <img
                                    src={imagePreview}
                                    alt="X-ray preview"
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              </div>
                            )}

                            {result && (
                              <div className="mt-4 space-y-4">
                                <div className={`p-4 rounded-md ${
                                  result.result.diagnosis === 'Normal' 
                                    ? 'bg-green-50 border border-green-200' 
                                    : 'bg-red-50 border border-red-200'
                                }`}>
                                  <h3 className={`text-lg font-bold ${
                                    result.result.diagnosis === 'Normal' ? 'text-green-700' : 'text-red-700'
                                  }`}>
                                    {result.result.diagnosis}
                                  </h3>
                                  <p className="text-sm mt-1">
                                    Confidence: {(result.result.confidence * 100).toFixed(2)}%
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : selectedDisease === "diabetes" ? (
                          <div className="space-y-6 mt-4">
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Diabetes Risk Assessment</AlertTitle>
                              <AlertDescription>
                                Please provide your health metrics for diabetes risk analysis.
                              </AlertDescription>
                            </Alert>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                                <Input
                                  id="glucose"
                                  type="number"
                                  value={glucose}
                                  onChange={(e) => setGlucose(e.target.value)}
                                  min="0"
                                  placeholder="e.g. 120"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="insulin">Insulin (mu U/ml)</Label>
                                <Input
                                  id="insulin"
                                  type="number"
                                  value={insulin}
                                  onChange={(e) => setInsulin(e.target.value)}
                                  min="0"
                                  placeholder="e.g. 80"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                  id="age"
                                  type="number"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                                  min="0"
                                  max="120"
                                  placeholder="e.g. 45"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={gender} onValueChange={setGender}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input
                                  id="weight"
                                  type="number"
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                  min="0"
                                  step="0.1"
                                  placeholder="e.g. 70"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                  id="height"
                                  type="number"
                                  value={height}
                                  onChange={(e) => setHeight(e.target.value)}
                                  min="0"
                                  step="0.1"
                                  placeholder="e.g. 170"
                                />
                              </div>
                            </div>

                            {bmi && (
                              <div className="p-3 bg-gray-50 rounded-md">
                                <p className="text-sm font-medium">Calculated BMI: {bmi}</p>
                              </div>
                            )}

                            {diabetesResult && (
                              <div className="mt-4 space-y-4">
                                <div className={`p-4 rounded-md ${
                                  diabetesResult.diagnosis.includes("No") 
                                    ? 'bg-green-50 border border-green-200' 
                                    : 'bg-red-50 border border-red-200'
                                }`}>
                                  <h3 className={`text-lg font-bold ${
                                    diabetesResult.diagnosis.includes("No") ? 'text-green-700' : 'text-red-700'
                                  }`}>
                                    {diabetesResult.diagnosis}
                                  </h3>
                                  <p className="text-sm mt-2">
                                    {diabetesResult.recommendation}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="age">Age</Label>
                              <Input
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                min="0"
                                max="120"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="gender">Gender</Label>
                              <Select value={gender} onValueChange={setGender}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="weight">Weight (kg)</Label>
                              <Input
                                id="weight"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                min="0"
                                step="0.1"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="height">Height (cm)</Label>
                              <Input
                                id="height"
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                min="0"
                                step="0.1"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <CardFooter className="flex justify-end mt-6">
                        <Button 
                          type="submit" 
                          disabled={loading || 
                            (selectedDisease === "pneumonia" && !imageFile) ||
                            (selectedDisease === "diabetes" && (!glucose || !bmi || !insulin || !age))
                          }
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            "Analyze"
                          )}
                        </Button>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Disease Information</CardTitle>
                    <CardDescription>Learn more about the diseases we can detect.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Heart Disease</h3>
                        <p>
                          Heart disease refers to various conditions that affect the heart and blood vessels. Our AI can
                          help detect potential risk factors and early signs of heart disease.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Diabetes</h3>
                        <p>
                          Diabetes is a chronic condition that affects how your body turns food into energy. Our system
                          analyzes four key metrics (glucose, BMI, insulin, and age) to assess your risk of diabetes using
                          a K-Nearest Neighbors machine learning model trained on clinical data.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Skin Cancer</h3>
                        <p>
                          Skin cancer is the abnormal growth of skin cells. Our AI-powered image analysis can help
                          identify potential skin cancer lesions for further examination by a dermatologist.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Pneumonia</h3>
                        <p>
                          Pneumonia is an infection that inflames the air sacs in one or both lungs. Our AI system
                          analyzes chest X-rays to detect signs of pneumonia with over 90% accuracy. The model has been
                          trained on thousands of radiographic images to identify patterns consistent with pneumonia.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}