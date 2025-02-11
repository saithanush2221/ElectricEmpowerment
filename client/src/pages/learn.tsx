import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { educationalContent } from "@/lib/data";

const evBasics = [
  {
    title: "What is an Electric Vehicle?",
    content: "An electric vehicle (EV) is powered by one or more electric motors using energy stored in rechargeable batteries. Unlike conventional vehicles with internal combustion engines, EVs produce zero direct emissions.",
    image: "https://images.unsplash.com/photo-1667805630247-28c2a8db1cb4"
  },
  {
    title: "Types of Electric Vehicles",
    content: "There are several types of EVs including Battery Electric Vehicles (BEVs), Plug-in Hybrid Electric Vehicles (PHEVs), and Hybrid Electric Vehicles (HEVs). Each type offers different benefits and use cases.",
    image: "https://images.unsplash.com/photo-1669334788758-c97e6263f149"
  }
];

const chargingGuide = [
  {
    title: "Charging Basics",
    content: "EV charging is available in three main levels: Level 1 (120V AC), Level 2 (240V AC), and DC Fast Charging. Each level offers different charging speeds and is suitable for different situations.",
    image: "https://images.unsplash.com/photo-1663008519764-0616547c493a"
  },
  {
    title: "Home Charging",
    content: "Most EV owners charge their vehicles at home using Level 1 or Level 2 chargers. Home charging is convenient and typically costs less than public charging stations.",
    image: "https://images.unsplash.com/photo-1610698553131-1f12a1615cc2"
  }
];

const maintenanceTips = [
  {
    title: "Battery Care",
    content: "Proper battery maintenance is crucial for EV longevity. Avoid frequent fast charging and try to keep the battery level between 20% and 80% for optimal battery life.",
    image: "https://images.unsplash.com/photo-1671602472505-5830833ecb70"
  },
  {
    title: "Regular Check-ups",
    content: "While EVs require less maintenance than conventional vehicles, regular check-ups are still important. Focus on tire rotation, brake fluid, and cabin air filter replacement.",
    image: "https://images.unsplash.com/photo-1592599457638-3ae7ccfbe065"
  }
];

export default function Learn() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Learn About EVs</h1>

        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basics">EV Basics</TabsTrigger>
            <TabsTrigger value="charging">Charging Guide</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-8">
                {evBasics.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-muted-foreground">{item.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="charging">
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-8">
                {chargingGuide.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-muted-foreground">{item.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="maintenance">
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <div className="space-y-8">
                {maintenanceTips.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <p className="text-muted-foreground">{item.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
