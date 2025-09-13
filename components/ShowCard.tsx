import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TokenLaunchpad from "./launchpad";

const ShowCard = () => {
  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-card border-border shadow-lg mx-auto">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-xl sm:text-2xl font-bold text-card-foreground">
          Create Your Token
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          launch your cryptocurrency in
          minutes, fast and secure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2">
          <TokenLaunchpad />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
